const express = require('express');
const path = require('path');
const routes = require('./routes');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakersService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();

const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['gidur12412ewe2', 'violet12412ewe2'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.use(express.static(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});
