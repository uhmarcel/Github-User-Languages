const colorPalette = require('./modules/colorPalette');
const loadUserAPI = require('./modules/loadUserAPI');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

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