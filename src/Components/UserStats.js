import React, { Component } from 'react';
import { Progress } from 'reactstrap';
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
        const {stats} = this.props;
        const languageData = this.formatData(stats);
        const max = Math.max(...Object.values(stats));
        console.log(Object.values(stats));
        console.log(max);
        console.log(Object.values(stats)[0]/max);
        return (
            <div className='h-100 d-flex align-items-center'>
                <div className='w-100'>
                    <div className='container'>
                        {Object.values(stats).map(lang => 
                                <Progress 
                                    value={lang*100/max} 
                                    className='mb-2'
                                />
                        )}
                    </div>
                    <Chart type='pie' data={languageData}/>
                </div>
            </div>
        );
    }

}

export default UserStats;