import React, { Component } from 'react'
import { Container } from 'reactstrap'
import UserInput from './UserInput'
import Loading from './Loading'
import UserStats from './UserStats'

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

    getStatsAPI = async (profile) => {
        const response = await fetch('/api/language-stats', {
            method: 'POST',
            body: JSON.stringify({post: profile}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const stats = await response.json();
        console.log(profile);
        console.log(stats);

        if (response.status !== 200) {
        throw Error(stats.message) 
        }
        return stats;
    }

    handleSubmit = async (profile) => {
        this.setState({scene: scenes.LOADING});
        const stats = await this.getStatsAPI(profile);
        if (stats.error) {
            this.setState({scene: scenes.INPUT});
            return;
        }
        this.setState({
            languageStats: stats,
            scene: scenes.STATS
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