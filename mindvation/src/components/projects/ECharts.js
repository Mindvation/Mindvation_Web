import React, {Component} from 'react';
import {Segment} from 'semantic-ui-react';
import echarts from 'echarts';

class Echarts extends Component {

    componentDidMount() {
        this.getECharts();
    }

    getECharts() {
        const graph = {
            "nodes": [
                {
                    "id": "0",
                    "name": "0",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(235,81,72)"
                        }
                    },
                    "symbolSize": 28.685715,
                    "x": -266.82776,
                    "y": 299.6904,
                    "attributes": {
                        "modularity_class": 0
                    }
                },
                {
                    "id": "1",
                    "name": "1",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize": 40,
                    "x": -418.08344,
                    "y": 446.8853,
                    "attributes": {
                        "modularity_class": 1
                    }
                },
                {
                    "id": "2",
                    "name": "2",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize": 40,
                    "x": 418.08344,
                    "y": 446.8853,
                    "attributes": {
                        "modularity_class": 2
                    }
                }
            ],
            "links": [
                {
                    "id": "0",
                    "name": null,
                    "source": "1",
                    "target": "0",
                    "lineStyle": {
                        "normal": {
                            "color": "Blue",
                            "width": 13,
                            "type": "dashed"
                        }
                    }
                },
                {
                    "id": "1",
                    "name": null,
                    "source": "2",
                    "target": "0",
                    "lineStyle": {
                        "normal": {
                            "color": "Red",
                            "width": 21,
                            "type": "groove"
                        }
                    }
                },
                {
                    "id": "2",
                    "name": null,
                    "source": "0",
                    "target": "1",
                    "lineStyle": {
                        "normal": {
                            "color": "Black",
                            "width": 5,
                            "type": "ridge"
                        }
                    }
                },
                {
                    "id": "3",
                    "name": null,
                    "source": "2",
                    "target": "1",
                    "lineStyle": {
                        "normal": {
                            "color": "Green",
                            "width": 9,
                            "type": "solid"
                        }
                    }
                }
            ]
        };
        const myChart = echarts.init(document.getElementById('main'));

        let categories = [];
        for (let i = 0; i < 9; i++) {
            categories[i] = {
                name: '类目' + i
            };
        }
        graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.symbolSize /= 1.5;
            node.label = {
                normal: {
                    show: node.symbolSize > 30
                }
            };
            node.category = node.attributes.modularity_class;
        });
        const option = {
            title: {
                text: '',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [{
                // selectedMode: 'single',
                data: categories.map(function (a) {
                    return a.name;
                })
            }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);

        myChart.on('click', (params) => {
            this.showClickParams(params);
        });
    }

    showClickParams(params) {
        alert(JSON.stringify(params.data));
    }

    render() {
        return (
            <Segment style={{width: '1030px', height: '830px'}}>
                <div id="main" style={{width: '1000px', height: '800px'}}>

                </div>
            </Segment>
        );
    }
}

export default Echarts;