const palette = require('./colorPalette');
const fetch = require('node-fetch');
const accessToken = process.env.accessToken;

module.exports = async (profile) => {

  if (!profile) {
    return {error: "Empty profile"}
  }

  const query = `query {
      user(login: "${profile}") {
        name: repositories(last: 100, isFork: false) {
          nodes {
            languages (last: 100) {
              nodes {
                name
              }
              edges {
                size
              }
            }
          }
        }
      }
    }`;
  
  const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify({query}),
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  });
  const api = await response.json();

  if (api.errors) {
      return {error: api.errors[0].message};
  }

  let languageStats = {};
  api.data.user.name.nodes.forEach(repo => {
      const length = repo.languages.nodes.length;
      for (let i=0; i<length; i++) {
          const language = repo.languages.nodes[i].name; 
          const value = repo.languages.edges[i].size; 
          if (!languageStats[language]) {
              languageStats[language] = {
                  color: palette[language],
                  value: 0
              }
          }
          languageStats[language].value += value;
      }
  })

  const statsArray = Object.entries(languageStats).sort((A,B) => (B[1].value - A[1].value));
  return statsArray;
}
