import React, { Component } from 'react';
import { Chart } from 'primereact/chart';

class UserStats extends Component {

    formatData(languageStats) {
        let data = {
            labels: Object.keys(languageStats),
            datasets: [
                {
                    data: Object.values(languageStats),
                    backgroundColor: this.getLanguageColors(languageStats)
                }
            ]
        }
        return data;
    }

    getLanguageColors(lang) {
        const {palette} = this.props;
        let colors = [];
        Object.keys(lang).forEach(l => {
            colors.push(palette[l])
        });
        return colors;
    }

    render() {
        const languageData = this.formatData(this.props.stats);
        return (
            <div className='h-100 d-flex align-items-center'>
                <div className='w-100 text-center'>
                    <Chart type='pie' data={languageData}/>
                </div>
            </div>
        );
    }

}

export default UserStats;