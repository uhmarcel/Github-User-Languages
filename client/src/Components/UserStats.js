import React, { Component } from 'react'
import { Container, Row, Col, Fade, Card, Button} from 'reactstrap'
import ghIcon from '../Assets/gh-icon.png'
import { Line } from 'rc-progress'
import { Chart } from 'primereact/chart'

class UserStats extends Component {

    state = {
        fadeout: false
    }

    componentDidUpdate() {
        const {nextScene} = this.props;
        const {fadeout} = this.state;
        if (!fadeout && nextScene !== null) {
            this.setState({
                fadeout: true
            })
        }
    }

    formatData(stats) {
        let data = {
            labels: stats.map(s => s[0]),
            datasets: [{
                data: stats.map(s => s[1].value),
                backgroundColor: stats.map(s => s[1].color)
            }]
        }
        return data;
    }

    render() {
        const {stats, profile, swapScene, setScene} = this.props;
        const {fadeout} = this.state;
        const languageData = this.formatData(stats);
        const max = Math.max(...stats.map(s => s[1].value));
        const avatarUrl = 'https://github.com/' + profile + '.png?size=100';

        return (
            <Card style={{minHeight: '100vh'}}>
                <Fade 
                    className='h-100 container'
                    onExited={swapScene}
                    in={!fadeout} 
                >
                    <div className='w-100'>
                        <div className='text-center m-5'>
                            <img src={ghIcon} alt={'Github mark'}/>
                            <h4 >Language Statistics</h4>
                            <img src={avatarUrl} alt={'User avatar'} className='mt-3' style={{
                                borderRadius: '10%',
                                height: '100px',
                                width: '100px'
                            }}/>
                            <p className='text-secondary'>{profile}</p>
                        </div>
                        <Chart 
                            type = 'pie' 
                            data = {languageData}
                            className = 'mb-5'
                            style={{maxWidth: '700px', margin: 'auto'}}
                        />
                        <Container className= 'mb-5' style = {{maxWidth: '700px'}}>
                            {stats.map((lang, key) => 
                                <Row key={key} className='w-100 d-flex flex-row-reverse m-auto'>
                                    <Col xs='7'>
                                        <Line 
                                            percent = {lang[1].value * 100 / max}
                                            strokeWidth = '4'
                                            strokeColor = {lang[1].color}
                                        />
                                    </Col>
                                    <Col xs='auto' className='text-right'>
                                        {lang[0]}
                                    </Col>
                                </Row>
                            )}
                        </Container>
                        <div className='text-center mb-5'>
                            <Button color='primary' className='m-auto' onClick={(e) => {e.preventDefault(); setScene(0)}}>Go back</Button>
                        </div>
                    </div>
                </Fade>
            </Card>
        );
    }

}

export default UserStats;