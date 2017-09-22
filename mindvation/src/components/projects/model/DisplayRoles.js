import React, {Component} from 'react';
import ECharts from '../../common/ECharts';
import {getTimeAndRandom, getCoordinate} from '../../../util/CommUtil';

class DisplayRoles extends Component {
    getOption() {
        const {roles} = this.props.modelInfo.basicInfo;
        let data = getCoordinate(roles.length);
        data.map((item, i) => {
            item.name = roles[i].value
        });
        const option = {
            title: {
                text: '角色'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: false,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000000'
                            }
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: data,
                    links: [],
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        };
        return option;
    }

    render() {
        const echartId = getTimeAndRandom();
        return (
            <div className="model-display-roles">
                <ECharts eChartId={echartId} option={this.getOption()}/>
            </div>
        );
    }
}

export default DisplayRoles;
