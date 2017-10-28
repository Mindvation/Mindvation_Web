import React, {Component} from 'react';
import {Header, Icon, Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {FormattedMessage} from 'react-intl';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {getModels} from '../../../util/Service';
import ModelDetail from '../ModelDetail';
import {getStaffId} from '../../../util/UserStore';

const rmKey = ["modelId", "name", "vote", "quoted", "comments"];

class MyModelList extends Component {

    state = {
        model: {
            models: [],
            totalNumber: 1
        },
        showDetail: false
    };

    componentDidMount() {
        const params = {
            "page": 1,
            "pageSize": 3,
            "creatorId": getStaffId()
        };

        getModels(params, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    pageChange = (page, pageSize) => {
        const params = {
            "page": page,
            "pageSize": pageSize,
            "creatorId": getStaffId()
        };

        getModels(params, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    handleDisplayData = (data, key) => {

        if (key === "vote") {
            return <div>
                <Icon name="thumbs up" size="big"/>{data[key] ? data[key] : 0}
            </div>
        }

        if (key === "quoted") {
            return <div>
                <Icon name="external share" size="big"/>{data[key] ? data[key] : 0}
            </div>
        }

        if (key === "comments") {
            return <div>
                <Icon name="talk" size="big"/>{data[key] ? data[key] : 0}
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
            this.modelDetailNode.initModelData(model.model.modelId)
        });
    };

    showModelList = () => {
        this.setState({
            showDetail: false
        });
    };

    render() {
        const {model, showDetail} = this.state;
        return (
            <div className="project-content">
                <div style={{display: showDetail ? 'none' : 'block'}}>
                    <Header as='h3'>
                        <Icon name='file text outline'/>
                        <Header.Content className={"project-title underLine"}>
                            My Models
                        </Header.Content>
                    </Header>
                    <Table striped>
                        <Table.Body>
                            {
                                model.models.map((result, i) => {
                                    return <Table.Row key={i}>
                                        {
                                            rmKey.map((key, j) => {
                                                return <Table.Cell
                                                    key={i + "_" + j}>
                                                    {this.handleDisplayData(result.model, key)}
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
                                    <Pagination defaultCurrent={1} total={model.totalNumber}
                                                showQuickJumper pageSize={3}
                                                onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
                {showDetail ?
                    <div>
                        <ModelDetail ref={node => this.modelDetailNode = node}/>
                        <Button
                            style={{marginTop: '1em'}}
                            primary size="small" onClick={() => this.showModelList()}>
                            返回
                        </Button>
                    </div>
                    : null}
            </div>
        );
    }
}

export default MyModelList;