import React, { Component } from 'react'
import { Card, Input, Container, Button, Fade } from 'reactstrap'
import ghIcon from '../Assets/gh-icon.png'

class UserInput extends Component {

    state = {
        profile: null,
        fadeout: false
    }

    componentDidUpdate() {
        const {nextScene} = this.props;
        const {fadeout} = this.state;
        if (!fadeout && nextScene) {
            this.setState({
                fadeout: true
            })
        }
    }

    handleChange = (e) => {
        const profile = e.target.value;
        this.setState({profile});
    }

    handleSubmit = () => {
        const {onSubmit} = this.props;
        const {profile} = this.state;
        if (onSubmit) {
            onSubmit(profile);
        }
    }

    render() {
        const {fadeout} = this.state;
        const {swapScene} = this.props;
        return (
            <Card style={{height: 'calc(100vh - 24px)'}}>
                <Fade 
                    className='h-100 d-flex align-items-center'
                    onExited={swapScene}
                    in={!fadeout} 
                >
                    <Container className='text-center'>
                        <img src={ghIcon} alt={'Github mark'}/>
                        <h4 className='mt-2'>Enter github profile</h4>
                        <div className='mt-4'>
                            <Input 
                                className='mb-3 text-center'
                                placeholder='Username' 
                                onChange={this.handleChange}
                            />
                            <Button color='primary mb-4' onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Container>
                </Fade>
            </Card>
        );
    }

}

export default UserInput;