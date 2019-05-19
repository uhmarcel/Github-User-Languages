const palette = require('./colorPalette');
const fetch = require('node-fetch');
const accessToken = process.env.accessToken;


module.exports = async (profile) => {

    const query = `query {
        user(login: ${profile}) {
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

    if (api.message) {
        return {error: userData.message};
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



/*

    const oauth = '?per_page=100&client_id=' + clientID + '&client_secret=' + clientSecret;
    const URL = 'https://api.github.com/users/' + profile + '/repos' + oauth;   
    const userData = await ( await fetch(URL) ).json();   
    if (userData.message) {
        return {error: userData.message};
    }
    
    const rawLang = await Promise.all(userData.map(repo => fetch(repo.languages_url + oauth)));
    const langData = await Promise.all(rawLang.map(raw => raw.json()));

    let languageStats = {};
    langData.forEach(repoLang => {
        const keys = Object.keys(repoLang);
        keys.forEach(language => {
            if (!languageStats[language]) {
                languageStats[language] = {
                    value: 0,
                    color: palette[language]
                }
            }
            languageStats[language].value += repoLang[language];
        })
    });
    return statsArray;
}


*/