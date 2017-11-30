import React, {Component} from 'react';
import {Table, Button, Image, Modal} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {FormattedMessage} from 'react-intl';
import {isEmpty} from '../../../util/CommUtil';
import {getModels} from '../../../util/Service';
import ModelDetail from '../ModelDetail';
import {modelOptions} from '../../../res/data/dataOptions';
import MVImage from '../../common/Image';

const header = ["Ranking", "Templates Name", "Creator", "Vote", "Quoted", "Comment", "Detail"];
const rmKey = ["sort", "name", "creatorInfo", "vote", "quoted", "comments"];

class ModelList extends Component {

    state = {
        model: {
            models: [],
            totalNumber: 1
        },
        modalOpen: false,
        selectedModel: 'software',
        currentPage: 1,
        selectedModelId: null
    };

    componentWillMount() {
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
        if (key === "sort") {
            return data[key] < 4 ?
                <MVImage name={"medal_" + data[key]} style={{marginRight: 0}}/> :
                <div className="sort-text">data[key]</div>
        }
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
            return <div className="display-flex-center">
                <MVImage name="like_withMe"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (key === "quoted") {
            return <div className="display-flex-center">
                <MVImage name="quote"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (key === "comments") {
            return <div className="display-flex-center">
                <MVImage name="comments"/>{data.model[key] ? data.model[key] : 0}
            </div>
        }

        if (isEmpty(data.model[key])) {
            return 'N/A';
        }

        return data.model[key];
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
        const {model, modalOpen, selectedModel, currentPage, selectedModelId} = this.state;
        return (
            <div>
                <div>
                    <div className="project-header">
                        <MVImage name='templates'/>
                        <FormattedMessage
                            id='modelsAndTemplates'
                            defaultMessage='Template'
                        />
                    </div>
                    <div className="display-flex">
                        {modelOptions.map((option) => {
                            return <div key={option.value}
                                        onClick={() => {
                                            this.getModelsByType(option.value)
                                        }}
                                        className={"model-type-button " + (selectedModel === option.value ? "model-type-active" : "")}>
                                <MVImage
                                    name={option.value + (selectedModel === option.value ? "" : "_unselected")}/>{option.text}
                            </div>
                        })}
                    </div>
                    <div className="model-list-table">
                        <Table textAlign="center">
                            <Table.Header>
                                <Table.Row>
                                    {
                                        header.map((result, i) => {
                                            return <Table.HeaderCell className="checklist-table-cell-length" key={i}>
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
                                                        {this.handleDisplayData(result, key)}
                                                    </Table.Cell>
                                                })
                                            }
                                            <Table.Cell>
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
                                                    current={currentPage}
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

export default ModelList;