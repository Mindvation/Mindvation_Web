import React, {Component} from 'react';
import ECharts from '../../common/ECharts';
import PropTypes from 'prop-types';

class BurnDownChart extends Component {

    getOption() {
        const option = {
            title: {
                text: 'Burn Down'
            },
            tooltip: {
                trigger: 'axis'
            },
            /*legend: {
                data: ['Project']
            },*/
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6', 'Sprint 7']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Project',
                    type: 'line',
                    stack: 'Sprint points',
                    data: [325, 278, 233, 150, 89, 43, 0]
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <ECharts eChartId="burnDownChart" option={this.getOption()}/>
        );
    }
}

BurnDownChart.propTypes = {
    eChartId: PropTypes.string
};

export default BurnDownChart;