const colorPalette = require('./modules/colorPalette');
const loadUserAPI = require('./modules/loadUserAPI');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/language-stats', async (req, res) => {
  console.log('New request');
  try {
  const profile = req.body.post;
  console.log('fetching API for ' + profile + '...');
  const response = await loadUserAPI(profile, colorPalette);
  res.send(response);
  console.log('Done');
  }
  catch (e) {
    console.log('Error: ' + e.message);
    res.send({
      error: 'User does not exist'
    })
  }
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));