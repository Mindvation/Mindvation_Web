import React, {Component} from 'react';
import {Table, Button, Modal} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {FormattedMessage} from 'react-intl';
import {isEmpty} from '../../../util/CommUtil';
import {getModels} from '../../../util/Service';
import ModelDetail from '../ModelDetail';
import {getStaffId} from '../../../util/UserStore';
import Image from '../../common/Image';

const header = ["Model ID", "Templates Name", "Vote", "Quoted", "Comment", "Detail"];
const rmKey = ["modelId", "name", "vote", "quoted", "comments"];

class MyModelList extends Component {

    state = {
        model: {
            models: [],
            totalNumber: 1
        },
        modalOpen: false,
        selectedModelId: null
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
            return <div className="display-flex-center">
                <Image name="like_withMe"/>{data[key] ? data[key] : 0}
            </div>
        }

        if (key === "quoted") {
            return <div className="display-flex-center">
                <Image name="quote"/>{data[key] ? data[key] : 0}
            </div>
        }

        if (key === "comments") {
            return <div className="display-flex-center">
                <Image name="comments"/>{data[key] ? data[key] : 0}
            </div>
        }

        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    };

    showModelDetail = (model) => {
        this.setState({
            modalOpen: true,
            selectedModelId: model.model.modelId
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    render() {
        const {model, selectedModelId, modalOpen} = this.state;
        return (
            <div>
                <div>
                    <div className="project-header">
                        <Image name='templates'/>
                        <FormattedMessage
                            id='myModels'
                            defaultMessage='My Models'
                        />
                    </div>
                    <div>
                        <Table textAlign="center">
                            <Table.Header>
                                <Table.Row>
                                    {
                                        header.map((result, i) => {
                                            return <Table.HeaderCell key={i}>
                                                {result ? <FormattedMessage
                                                    id={result}
                                                /> : ""}
                                            </Table.HeaderCell>
                                        })
                                    }
                                </Table.Row>
                            </Table.Header>
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
                                                <div className="table-action-detail"
                                                     onClick={() => this.showModelDetail(result)}>
                                                    <FormattedMessage
                                                        id='Detail'
                                                        defaultMessage='Detail'
                                                    />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    })
                                }
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan={rmKey.length + 1}>
                                        <Pagination defaultCurrent={1} total={model.totalNumber}
                                                    pageSize={3}
                                                    onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div>
                </div>
                <Modal
                    size="large"
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <ModelDetail modelId={selectedModelId}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='back'
                                defaultMessage='Back'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default MyModelList;