import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'localhost:3000', credentials: true }));

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('ninja_api');
    console.log('---------- database connected ------------');

    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const article = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(article);
  }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db.collection('articles').findOne({ name: articleName });

    await db.collection('articles').updateOne({ name: articleName }, { $set: { upvotes: articleInfo.upvotes + 1 } });

    const article = await db.collection('articles').findOne({ name: articleName });

    res.status(200).send({
      message: 'Article upvoted',
      article,
    });
  }, res);
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({
            username,
            text,
          }),
        },
      }
    );
    const article = await db.collection('articles').findOne({ name: articleName });
    let comments = article.comments;
    article.comments = comments.slice(0, 5);

    res.status(200).json(article);
  }, res);
});

app.post('/api/articles', async (req, res) => {
  const { name, upvotes, comments } = req.body;
  withDB(async (db) => {
    await db.collection('articles').insertOne({
      name,
      upvotes: upvotes,
      comments: comments,
    });
    res.status(200).json({
      message: 'Article created',
    });
  }, res);
});

app.get('/api/articles', (req, res) => {
  withDB(async (db) => {
    const articles = await db.collection('articles').find({}).toArray();
    res.status(200).json(articles);
  }, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
