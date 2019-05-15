const {clientID, clientSecret} = require('./OAuthCredentials');
const fetch = require('node-fetch');

module.exports = async (profile, palette) => {
    const oauth = '?client_id=' + clientID + '&client_secret=' + clientSecret;
    const URL = 'https://api.github.com/users/' + profile + '/repos' + oauth;   
    const userData = await ( await fetch(URL) ).json();   
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
    const statsArray = Object.entries(languageStats).sort((A,B) => (B[1].value - A[1].value));
    return statsArray;
}


