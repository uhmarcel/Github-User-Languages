import React, { Component } from 'react';
import { Container, Card } from 'reactstrap';
import { clientID, clientSecret } from '../OAuthCredentials';
import UserInput from './UserInput';
import Loading from './Loading';
import UserStats from './UserStats';


const scenes = {
    INPUT: 0,
    LOADING: 1,
    STATS: 2
}

class Application extends Component {

    state = {
        scene: scenes.INPUT,
        languageStats: null
    }

    handleSubmit = async (profile) => {
        this.setState({scene: scenes.LOADING});
        this.loadUserAPI(profile);
    }

    loadUserAPI = async (profile) => {
        const oauth = '?client_id=' + clientID + '&client_secret=' + clientSecret;
        const URL = 'https://api.github.com/users/' + profile + '/repos' + oauth;   
        const userData = await ( await fetch(URL) ).json();   
        const rawLang = await Promise.all(userData.map(repo => fetch(repo.languages_url + oauth)));
        const langData = await Promise.all(rawLang.map(raw => raw.json()));

        let languageStats = {};
        langData.forEach(repoLang => {
            const keys = Object.keys(repoLang);
            keys.forEach(language => {
                if (!languageStats[language]) 
                    languageStats[language] = 0;
                languageStats[language] += repoLang[language];
            })
        });
        this.setState({
            languageStats,
            scene: scenes.STATS
        });
    }

    getComponent() {
        const {scene, languageStats} = this.state;
        switch (scene) {
            case scenes.INPUT: 
                return (<UserInput onSubmit={this.handleSubmit}/>);
            case scenes.LOADING: 
                return (<Loading/>);
            case scenes.STATS: 
                return (<UserStats stats={languageStats}/>);
            default: 
                return (<p>error</p>);
        }
    }

    render() {
        return(
            <Container className='appContainer'>
                <Card className='h-100'>
                    { this.getComponent() }
                </Card>
            </Container>
        );
    }

}

export default Application;