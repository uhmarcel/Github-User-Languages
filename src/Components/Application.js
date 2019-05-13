import React, { Component } from 'react';
import { Container, Card } from 'reactstrap';
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
        scene: scenes.INPUT
    }

    handleSubmit = async (profile) => {
        this.setState({scene: scenes.LOADING});
        this.loadUserAPI(profile);
    }

    loadUserAPI = async (profile) => {
        const URL = 'https://api.github.com/users/' + profile + '/repos';        
        const userData = await ( await fetch(URL) ).json();   
        const rawLang = await Promise.all(userData.map(repo => fetch(repo.languages_url)));
        console.log(rawLang);
        const langData = await Promise.all(rawLang.map(raw => raw.json()));

        console.log(langData);
    }

    loadRepoLanguage

    getComponent() {
        const {scene} = this.state;
        switch (scene) {
            case scenes.INPUT: 
                return (<UserInput onSubmit={this.handleSubmit}/>);
            case scenes.LOADING: 
                return (<Loading/>);
            case scenes.STATS: 
                return (<UserStats/>);
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