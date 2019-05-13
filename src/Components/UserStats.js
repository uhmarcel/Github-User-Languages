import React, { Component } from 'react';

class UserStats extends Component {

    render() {
        return (
            <div>
                <p>
                    {this.props.stats.toString()}
                </p>
            </div>
        );
    }

}

export default UserStats;