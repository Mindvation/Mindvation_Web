import React, {Component} from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

class Echarts extends Component {

    componentDidMount() {
        this.getECharts();
    }

    getECharts() {
        const {option, eChartId} = this.props;
        if (!option) return;
        const myChart = echarts.init(document.getElementById(eChartId));
        myChart.setOption(option);
        myChart.on('click', (params) => {
            this.showClickParams(params);
        });

        window.onresize = function () {
            myChart.resize();
        }
    }

    showClickParams(params) {
        alert(JSON.stringify(params.data));
    }

    render() {
        return (
            <div id={this.props.eChartId} style={{width: '100%', height: '100%'}}>

            </div>
        );
    }
}

Echarts.propTypes = {
    option: PropTypes.object.isRequired,
    eChartId: PropTypes.string.isRequired
};

export default Echarts;