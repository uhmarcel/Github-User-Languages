import React, { Component } from 'react';
import { Container, Card } from 'reactstrap';
// import { jsyaml } from 'js-yaml';
import { clientID, clientSecret } from '../OAuthCredentials';
import UserInput from './UserInput';
import Loading from './Loading';
import UserStats from './UserStats';

const $ = require('jquery');
let jsyaml = require('js-yaml');

const scenes = {
    INPUT: 0,
    LOADING: 1,
    STATS: 2
}

class Application extends Component {

    state = {
        scene: scenes.INPUT,
        languageStats: null,
        languagePalette: null, 
    }

    componentDidMount() {
        this.fetchColorPallete();
    }

    handleSubmit = async (profile) => {
        this.setState({scene: scenes.LOADING});
        this.loadUserAPI(profile);
    }

    loadUserAPI = async (profile) => {
        const {languagePalette} = this.state;
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
                        color: languagePalette[language]
                    }
                }
                languageStats[language].value += repoLang[language];
            })
        });
        this.setState({
            languageStats,
            scene: scenes.STATS
        });
    }

    fetchColorPallete = async () => {
        $.get("https://rawgit.com/github/linguist/master/lib/linguist/languages.yml", (data) => {
            const languages = jsyaml.safeLoad(data);
            const keys = Object.keys(languages);
            let palette = {};
            keys.forEach(lang => {
                palette[lang] = languages[lang].color;
            })
            this.setState({languagePalette: palette});
        });        
    }

    getComponent() {
        const {scene, languageStats, languagePalette} = this.state;
        switch (scene) {
            case scenes.INPUT: 
                return (<UserInput onSubmit={this.handleSubmit}/>);
            case scenes.LOADING: 
                return (<Loading/>);
            case scenes.STATS: 
                return (<UserStats stats={languageStats} palette={languagePalette}/>);
            default: 
                return (<p>error</p>);
        }
    }

    render() {
        return(
            <Container className='appContainer'>
                    { this.getComponent() }
            </Container>
        );
    }

}

export default Application;