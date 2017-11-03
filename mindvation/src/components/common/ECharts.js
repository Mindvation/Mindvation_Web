import React, {Component} from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

class Echarts extends Component {

    componentDidMount() {
        this.getECharts();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.eChartsResize);
    }

    componentWillReceiveProps(nextProps) {
        this.getECharts(nextProps);
    }

    eChartsResize = () => {
        let interval = setInterval(() => {
            this.myChart.resize();
            interval && clearInterval(interval);
        }, 250)
    };

    getECharts(nextProps) {
        let props = this.props;
        if (nextProps) {
            props = nextProps
        }
        const {option, eChartId} = props;
        if (!option) return;
        if (this.myChart) {
            this.myChart.setOption(option);
            return;
        }
        const myChart = echarts.init(document.getElementById(eChartId));
        myChart.setOption(option);

        /*myChart.on('click', (params) => {
            this.showClickParams(params);
        });*/

        this.myChart = myChart;
        window.addEventListener('resize', this.eChartsResize, false);
    }


    render() {
        return (
            <div id={this.props.eChartId} className="e-chart-component">

            </div>
        );
    }
}

Echarts.propTypes = {
    option: PropTypes.object.isRequired,
    eChartId: PropTypes.string.isRequired
};

export default Echarts;