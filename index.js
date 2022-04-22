const express = require('express');
const app = express();

const PORT = 3000;

function handler(req, res) {
  res.send('ok');
}

app.get('/', handler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
