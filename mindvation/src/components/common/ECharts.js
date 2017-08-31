import React, {Component} from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

class Echarts extends Component {

    state = {};

    componentDidMount() {
        this.getECharts();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.state.myChart.resize);
    }

    getECharts() {
        const {option, eChartId} = this.props;
        if (!option) return;
        const myChart = echarts.init(document.getElementById(eChartId));
        myChart.setOption(option);
        myChart.on('click', (params) => {
            this.showClickParams(params);
        });

        window.addEventListener('resize', myChart.resize, false);

        this.setState({
            myChart: myChart
        })
    }

    showClickParams(params) {
        alert(JSON.stringify(params.data));
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