import React, {Component} from 'react';
import ECharts from '../../common/ECharts';

class EfficiencyDashboard extends Component {

    getOption() {
        const option = {
            color: ["#30a5ff", "#ffb53e"],
            title: {
                text: 'Efficiency',
                x: 'center'
            },
            /*tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },*/
            series: [
                {
                    name: 'Efficiency',
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
                                color: '#f9243f'
                            }
                        },
                        emphasis: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                                color: '#f9243f'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 13, name: ''},
                        {value: 87, name: '\'87'}
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <ECharts eChartId="efficiencyDashboard" option={this.getOption()}/>
        );
    }
}

export default EfficiencyDashboard;