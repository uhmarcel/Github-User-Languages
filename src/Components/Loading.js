import React, { Component } from 'react';
import { Spinner, Fade, Card } from 'reactstrap';

class Loading extends Component {

    render() {
        return (
            <Card style={{height: 'calc(100vh - 20px)'}}>
                <Fade className='h-100 d-flex align-items-center m-auto'>
                    <div className='text-center'>
                        <h4>Loading...</h4>
                        <Spinner color="primary" className='mt-2'/> 
                    </div>
                </Fade>
            </Card>
        );
    }

}

export default Loading;