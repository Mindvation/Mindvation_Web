import React, {Component} from 'react';
import {Header, Icon, Table, Button, List, Image} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {FormattedMessage} from 'react-intl';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {getModels} from '../../../util/Service';
import ModelDetail from '../ModelDetail';
import {modelOptions} from '../../../res/data/dataOptions';

const rmKey = ["ranking", "name", "creatorInfo", "vote", "quoted", "comments"];

class ModelList extends Component {

    state = {
        model: {
            models: [],
            totalNumber: 1
        },
        showDetail: false,
        selectedModel: 'software',
        currentPage: 1
    };

    componentDidMount() {
        const params = {
            "page": 1,
            "pageSize": 3,
            "modelType": "software"
        };

        getModels(params, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    pageChange = (page, pageSize) => {
        this.setState({
            currentPage: page
        });
        const params = {
            "page": page,
            "pageSize": pageSize,
            "modelType": this.state.selectedModel
        };

        getModels(params, function (data) {
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

        const params = {
            "page": 1,
            "pageSize": 3,
            "modelType": type
        };

        getModels(params, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    handleDisplayData = (data, key) => {
        if (key === "creatorInfo") {
            return <div className="display-flex">
                <Image verticalAlign="middle" src={data[key].avatar}
                       className="model-creator-avatar"
                       avatar/>
                <div>
                    <div className="model-creator-name">{data[key].name}</div>
                    <div className="model-creator-company">{data[key].position}</div>
                    <div className="model-creator-company">{data[key].company}</div>
                </div>
            </div>;
        }

        if (key === "vote") {
            return <div>
                <Icon name="thumbs up" size="big"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (key === "quoted") {
            return <div>
                <Icon name="external share" size="big"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (key === "comments") {
            return <div>
                <Icon name="talk" size="big"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (isEmpty(data.model[key])) {
            return 'N/A';
        }

        return data.model[key];
    };

    showModelDetail = (model) => {
        this.setState({
            showDetail: true
        }, () => {
            this.modelDetailNode.initModelData(model.model.modelId);
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
                                model.models.map((result, i) => {
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
                                                <FormattedMessage
                                                    id='detail'
                                                    defaultMessage='Detail'
                                                />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                })
                            }
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={rmKey.length + 1}>
                                    <Pagination defaultCurrent={1} total={model.totalNumber}
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
                            <FormattedMessage
                                id='back'
                                defaultMessage='Back'
                            />
                        </Button>
                    </div>
                    : null}
            </div>
        );
    }
}

export default ModelList;