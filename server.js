const colorPalette = require('./modules/colorPalette');
const loadUserAPI = require('./modules/loadUserAPI');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/language-stats', async (req, res) => {
  try {
  const profile = req.body.post;
  const response = await loadUserAPI(profile, colorPalette);
  res.send(response);
  }
  catch {
    res.send({
      error: 'user non-existent'
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