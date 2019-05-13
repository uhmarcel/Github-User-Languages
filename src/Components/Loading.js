import React, { Component } from 'react';
import { Spinner, Fade } from 'reactstrap';

class Loading extends Component {

    render() {
        return (
            <Fade className='h-100 d-flex align-items-center m-auto'>
                <div className='text-center'>
                    <h4>Loading...</h4>
                    <Spinner color="primary" className='mt-2'/> 
                </div>
            </Fade>
        );
    }

}

export default Loading;