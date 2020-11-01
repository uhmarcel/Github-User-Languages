const loadUserAPI = require('./modules/loadUserAPI');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: 'http://github-languages.marcelriera.com',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.options('*');

app.post('/api/language-stats', async (req, res) => {
  console.log('New request');
  try {
    const profile = req.body.post;
    console.log(' - Fetching API for ' + profile + '...');
    const response = await loadUserAPI(profile);
    res.send(response);
    console.log(' - Done');
  }
  catch (e) {
    console.log(' - Error: ' + e.message);
    res.send({
      error: 'User does not exist'
    })
  }
});

// Serve web client on this server - DISABLED: CLIENT WILL BE HOSTED ELSEWHERE

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));
