import React, {Component} from 'react';
import {Grid, Segment, Button, Header, Icon, Modal} from 'semantic-ui-react';
import BurnDownChart from '../../detail/BurnDownChart';
import EfficiencyDashboard from '../../detail/EfficiencyDashboard';
import Progress from '../../../common/Progress';
import UploadMulti from '../../../common/UploadMulti';
import UploadAndProgress from '../../../common/UploadAndProgress';
import {getTimeAndRandom, checkCompleted} from '../../../../util/CommUtil';
import SelectModel from './SelectModel';
import EditProgress from './EditProgress';
import {FormattedMessage} from 'react-intl';

let mandatoryFile = ["title", "modelType"];

const modelMapping = [
    {
        key: "prototypeMap",
        text: "原型图",
        data: {
            key: getTimeAndRandom(),
            type: 'prototypeMap',
            title: '原型图',
            images: []
        }
    },
    {
        key: "UIMap",
        text: "UI效果图",
        data: {
            key: getTimeAndRandom(),
            type: 'UIMap',
            title: 'UI效果图',
            images: []
        }
    },
    {
        key: "logicMap",
        text: "逻辑图",
        data: {
            key: getTimeAndRandom(),
            type: 'logicMap',
            title: '逻辑图',
            images: []
        }
    },
    {
        key: "testCase",
        text: "测试用例",
        data: {
            key: getTimeAndRandom(),
            type: 'testCase',
            title: '测试用例',
            images: []
        }
    },
    {
        key: "custom",
        text: "自定义"
    }
];

class UploadAttach extends Component {
    state = {
        modelData: [],
        modalOpen: false
    };

    closeModal = () => {
        let timer = setTimeout(() => {
            this.setState({modalOpen: false});
            timer && clearTimeout(timer);
        }, 0);
    };

    addModel = () => {
        let modelInfo = this.SelectModelNode.getInfo();
        let flag = checkCompleted(mandatoryFile, modelInfo);
        if (flag) {
            this.closeModal();
            let tempData = this.state.modelData;
            tempData.push({
                key: getTimeAndRandom(),
                type: modelInfo.modelType,
                title: modelInfo.title,
                percent: 0,
                custom: true,
                images: []
            });
            this.setState({
                modelData: tempData
            })
        }
    };

    editProgress = (model) => {
        this.editProgressNode.openModal(model);
    };

    updateProgress = (model) => {
        let tempData = this.state.modelData;
        tempData.some((tempModel) => {
            if (tempModel.key === model.key) {
                tempModel.percent = model.percent;
                return true;
            }
        });
        this.setState({
            modelData: tempData
        })
    };

    SelectModel = (model) => {
        let tempArray = this.state.modelData;
        if (model.key === 'custom') {
            this.setState({
                modalOpen: true
            })
        } else {
            if (tempArray.indexOf(model.data) === -1) {
                tempArray.push(model.data);
                this.setState({
                    modelData: tempArray
                })
            }
        }
    };

    removeCustomModel = (model) => {
        let tempArray = this.state.modelData;
        if (tempArray.indexOf(model) !== -1) {
            tempArray.splice(tempArray.indexOf(model), 1);
            this.setState({
                modelData: tempArray
            })
        }
    };

    getComponent = (modelItem) => {
        if (modelItem.type === 'progress') {
            return <Progress percent={modelItem.percent} mode="charts" domKey={modelItem.key}
                             editProgress={() => this.editProgress(modelItem)}/>
        }
        if (modelItem.type === 'protoAndProgress') {
            return <UploadAndProgress percent={modelItem.percent} domKey={modelItem.key}
                                      editProgress={() => this.editProgress(modelItem)}/>
        }
        if (modelItem.type === 'proto') {
            return <UploadMulti/>
        }
        if (modelItem.type === 'prototypeMap') {
            return <UploadMulti/>
        }
        if (modelItem.type === 'UIMap') {
            return <EfficiencyDashboard/>
        }
        if (modelItem.type === 'logicMap') {
            return <BurnDownChart/>
        }
        if (modelItem.type === 'testCase') {
            return <UploadAndProgress/>
        }
    };

    render() {
        const {modalOpen, modelData} = this.state;
        return (
            <div>
                <div>
                    {
                        modelMapping.map((item, i) => {
                            return <Button key={i}
                                           basic
                                           className="upload-attach-button"
                                           onClick={() => this.SelectModel(item)}>{item.text}</Button>
                        })
                    }
                </div>
                {modelData.length > 0 ? <Grid className="upload-attach-content" columns={3}>
                    {
                        modelData.map((model, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="story-upload-file">
                                    <Header as='h4'>
                                        <Header.Content>
                                            <span className="underLine">
                                                {model.title}
                                            </span>
                                        </Header.Content>
                                    </Header>
                                    {this.getComponent(model)}
                                    {model.custom ?
                                        <Icon name="trash" size="big" className={"custom-model-delete pointer-cursor"}
                                              onClick={() => this.removeCustomModel(model)}/> : null}
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid> : null}
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        <FormattedMessage
                            id='customModelTypeSelection'
                            defaultMessage='Custom Model Type Selection'
                        />
                    </Modal.Header>
                    <SelectModel ref={node => this.SelectModelNode = node}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.addModel()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <EditProgress updateProgress={(model) => this.updateProgress(model)}
                              ref={node => this.editProgressNode = node}/>
            </div>
        );
    }
}

export default UploadAttach;
