import React, {Component} from 'react';
import ECharts from '../../common/ECharts';
import {getTimeAndRandom, getCoordinate} from '../../../util/CommUtil';

const roles = [
    {
        key: "R0",
        value: "Scrum Master"
    }, {
        key: "R1",
        value: "BED"
    }, {
        key: "R2",
        value: "Architecture"
    }, {
        key: "R3",
        value: "QA"
    }, {
        key: "R4",
        value: "BA"
    }, {
        key: "R5",
        value: "UX"
    }, {
        key: "R6",
        value: "FED"
    }, {
        key: "R7",
        value: "PO"
    }
];

class DisplayRoles extends Component {
    getOption() {
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
