import React, {Component} from 'react';
import ECharts from '../../common/ECharts';

class ProgressDashboard extends Component {

    getOption() {
        const option = {
            color: ["#1ebfae", "#8EE5EE"],
            title: {
                text: 'Progress',
                x: 'center'
            },
            /*tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },*/
            series: [
                {
                    name: 'Progress',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                                color: '#1ebfae'
                            }
                        },
                        emphasis: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                                color: '#1ebfae'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 10, name: ''},
                        {value: 90, name: '90%'}
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <ECharts eChartId="progressDashboard" option={this.getOption()}/>
        );
    }
}

export default ProgressDashboard;