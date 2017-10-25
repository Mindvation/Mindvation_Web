import React, {Component} from 'react';
import {Header, Icon, Table, Button, List} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {FormattedMessage} from 'react-intl';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {getModels} from '../../../util/Service';
import ModelDetail from '../ModelDetail';
import {modelOptions} from '../../../res/data/dataOptions';

const rmKey = ["ranking", "name", "creator", "vote", "quoted", "comments"];

class ModelList extends Component {

    state = {
        model: {
            modelList: [],
            totalElements: 1
        },
        showDetail: false,
        selectedModel: 'software',
        currentPage: 1
    };

    componentDidMount() {
        getModels('software', 0, 3, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    pageChange = (page, pageSize) => {
        this.setState({
            currentPage: page
        });
        getModels(this.state.selectedModel, page, pageSize, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    getModelsByType = (type) => {
        if (type === this.state.selectedModel) return;
        this.setState({
            selectedModel: type,
            currentPage: 1
        });
        getModels(type, 0, 3, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    handleDisplayData = (data, key) => {
        if (key === "creator") {
            return <div>
                <div>{data[key].name}</div>
                <div>{data[key].position}</div>
                <div>{data[key].company}</div>
            </div>;
        }

        if (key === "vote") {
            return <div>
                <Icon name="thumbs up" size="big"/>{data[key]}
            </div>
        }

        if (key === "quoted") {
            return <div>
                <Icon name="external share" size="big"/>{data[key]}
            </div>
        }

        if (key === "comments") {
            return <div>
                <Icon name="talk" size="big"/>{data[key]}
            </div>
        }

        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    };

    showModelDetail = (model) => {
        this.setState({
            showDetail: true
        }, () => {
            this.modelDetailNode.initModelData(model);
        });
    };

    showModelList = () => {
        this.setState({
            showDetail: false
        });
    };

    render() {
        const {model, showDetail, selectedModel, currentPage} = this.state;
        return (
            <div className="project-content">
                <div style={{display: showDetail ? 'none' : 'block'}}>
                    <Header as='h3'>
                        <Icon name='file text outline'/>
                        <Header.Content className={"project-title underLine"}>
                            Models And Templates
                        </Header.Content>
                    </Header>
                    <div>
                        <List horizontal className="model-attach">
                            {modelOptions.map((option) => {
                                return <List.Item key={option.value}>
                                    <Button primary={selectedModel === option.value}
                                            onClick={() => {
                                                this.getModelsByType(option.value)
                                            }}>{option.text}</Button>
                                </List.Item>
                            })}
                        </List>
                    </div>
                    <Table striped>
                        <Table.Body>
                            {
                                model.modelList.map((result, i) => {
                                    return <Table.Row key={i}>
                                        {
                                            rmKey.map((key, j) => {
                                                return <Table.Cell
                                                    key={i + "_" + j}>
                                                    {this.handleDisplayData(result, key)}
                                                </Table.Cell>
                                            })
                                        }
                                        <Table.Cell className="checklist-action-cell">
                                            <Button primary size="small" onClick={() => this.showModelDetail(result)}>
                                                详情
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                })
                            }
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={rmKey.length + 1}>
                                    <Pagination defaultCurrent={1} total={model.totalElements}
                                                showQuickJumper pageSize={3}
                                                current={currentPage}
                                                onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
                {showDetail ?
                    <div>
                        <ModelDetail ref={node => this.modelDetailNode = node}/>
                        <Button primary size="small" onClick={() => this.showModelList()}
                                style={{marginTop: '1em'}}>
                            返回
                        </Button>
                    </div>
                    : null}
            </div>
        );
    }
}

export default ModelList;