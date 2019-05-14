import React, { Component } from 'react';
import { Container, Row, Col, Fade, Card} from 'reactstrap';
import { Line } from 'rc-progress';
import { Chart } from 'primereact/chart';

class UserStats extends Component {

    formatData(stats) {
        let data = {
            labels: Object.keys(stats),
            datasets: [{
                data: Object.values(stats).map(lang => lang.value),
                backgroundColor: Object.values(stats).map(lang => lang.color)
            }]
        }
        return data;
    }

    getLanguageColors(lang) {
        const {palette} = this.props;
        let colors = [];
        Object.keys(lang).forEach(l => colors.push(palette[l]));
        return colors;
    }

    render() {
        const {stats} = this.props;
        const languageData = this.formatData(stats);
        const max = Math.max(...Object.values(stats).map(c => c.value));

        return (
            <Card style={{minHeight: '100vh'}}>
                <Fade className='h-100'>
                    <div className='w-100'>
                        <h4 className='text-center mb-4 mt-4'>Language Statistics</h4>
                        <Chart 
                            type = 'pie' 
                            data = {languageData}
                            className = 'mb-5'
                        />
                        <Container className= 'mb-4'>
                            {Object.entries(stats).map((lang, key) => 
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
                    </div>
                </Fade>
            </Card>
        );
    }

}

export default UserStats;