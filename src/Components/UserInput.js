import React, { Component } from 'react';
import { Card, Input, Container, Button, Fade } from 'reactstrap';


class UserInput extends Component {

    state = {
        profile: null
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
        return (
            <Card style={{height: 'calc(100vh - 20px)'}}>
                <Fade className='h-100 d-flex align-items-center'>
                    <Container>
                        <h4 className='text-center'>Enter github profile</h4>
                        <div className='text-center mt-4'>
                            <Input 
                                className='mb-3 text-center'
                                placeholder='Username' 
                                onChange={this.handleChange}
                            />
                            <Button color='primary' onClick={this.handleSubmit}>
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