import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crmRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose conenction
const mongo_url = 'mongodb://localhost:27017/ninja_api';
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/CRMdb', {
//   useNewUrlPraser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(mongo_url);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
