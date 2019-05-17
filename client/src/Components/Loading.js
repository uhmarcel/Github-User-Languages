import React, { Component } from 'react';
import { Spinner, Fade, Card } from 'reactstrap';

class Loading extends Component {

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

    render() {
        const {fadeout} = this.state;
        const {swapScene} = this.props;
        return (
            <Card style={{height: 'calc(100vh - 24px)'}}>
                <Fade 
                    className='h-100 d-flex align-items-center m-auto'
                    onExited={swapScene}
                    in={!fadeout} 
                >
                    <div className='text-center mb-5'>
                        <h4>Loading...</h4>
                        <Spinner color="primary" className='mt-2'/> 
                    </div>
                </Fade>
            </Card>
        );
    }

}

export default Loading;