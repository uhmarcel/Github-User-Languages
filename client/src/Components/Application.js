import React, { Component } from 'react'
import { Container, Fade } from 'reactstrap'
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
        nextScene: null,
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
        if (response.status !== 200) {
        throw Error(stats.message) 
        }
        return stats;
    }

    handleSubmit = async (profile) => {
        this.setState({nextScene: scenes.LOADING});
        const stats = await this.getStatsAPI(profile);
        if (stats.error) {
            this.setState({nextScene: scenes.INPUT});
            return;
        }
        this.setState({
            languageStats: stats,
            nextScene: scenes.STATS
        });
    }

    swapScene = async () => {
        this.setState({
            scene: this.state.nextScene,
            nextScene: null
        })
    } 

    getComponent() {
        const {scene, languageStats, languagePalette, nextScene} = this.state;
        switch (scene) {
            case scenes.INPUT: 
                return (<UserInput onSubmit={this.handleSubmit} nextScene={nextScene} swapScene={this.swapScene}/>);
            case scenes.LOADING: 
                return (<Loading nextScene={nextScene} swapScene={this.swapScene}/>);
            case scenes.STATS: 
                return (<UserStats stats={languageStats} palette={languagePalette} nextScene={nextScene} swapScene={this.swapScene}/>);
            default: 
                return (<p>error</p>);
        }
    }

    render() {
        return(
            <Container className='appContainer'>
                <Fade >
                    { this.getComponent() }
                </Fade>
            </Container>
        );
    }

}

export default Application;