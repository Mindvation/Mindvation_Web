import React, {Component} from 'react';
import ECharts from './ECharts';
import PropTypes from 'prop-types';
import {Progress, Icon} from 'semantic-ui-react';

class MvProgress extends Component {
    getOption() {
        const {percent = 0} = this.props;
        const option = {
            color: ["#21ba45", "#e5e5e5"],
            title: {
                text: 'Progress',
                x: 'center'
            },
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
                                color: '#21ba45'
                            }
                        },
                        emphasis: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                                color: '#21ba45'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: percent, name: percent + '%'},
                        {value: 100 - percent, name: ''}
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        const {mode = 'charts', percent = 0, editProgress, domKey} = this.props;
        return (
            mode === "charts" ? <div className="charts-progress-component">
                    <ECharts eChartId={domKey} option={this.getOption()}/>
                    {editProgress ? <div className={"charts-progress-edit-icon pointer-cursor"} onClick={() => {
                        editProgress()
                    }}>
                        <Icon name='pencil' size="big"/>
                    </div> : null}
                </div>
                : <div className="progress-component">
                    <Progress percent={percent} color='green' progress/>
                    {editProgress ? <div className={"progress-edit-icon pointer-cursor"} onClick={() => {
                        editProgress()
                    }}>
                        <Icon name='pencil' size="big"/>
                    </div> : null}
                </div>
        );
    }
}

MvProgress.propTypes = {
    mode: PropTypes.string,
    percent: PropTypes.number,
    editProgress: PropTypes.func,
    domKey: PropTypes.string
};

export default MvProgress;