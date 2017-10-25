import React, {Component} from 'react';
import {Segment, Button, Header, Modal} from 'semantic-ui-react';
import Progress from '../../common/Progress';
import UploadMulti from '../../common/UploadMulti';
import UploadAndProgress from '../../common/UploadAndProgress';
import {getTimeAndRandom, checkCompleted} from '../../../util/CommUtil';
import SelectModel from './SelectModel';
import {FormattedMessage} from 'react-intl';

let mandatoryFile = ["title", "modelType"];

const modelMapping = [
    {
        key: "prototypeMap",
        text: "原型图",
        data: {
            key: getTimeAndRandom(),
            type: 'protoAndProgress',
            title: '原型图',
            images: []
        }
    },
    {
        key: "UIMap",
        text: "UI效果图",
        data: {
            key: getTimeAndRandom(),
            type: 'proto',
            title: 'UI效果图',
            images: []
        }
    },
    {
        key: "logicMap",
        text: "逻辑图",
        data: {
            key: getTimeAndRandom(),
            type: 'progress',
            title: '逻辑图',
            images: []
        }
    },
    {
        key: "testCase",
        text: "测试用例",
        data: {
            key: getTimeAndRandom(),
            type: 'progress',
            title: '测试用例',
            images: []
        }
    },
    {
        key: "custom",
        text: "自定义"
    }
];

class SelectAttach extends Component {
    state = {
        model: {},
        modalOpen: false
    };

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    closeModal = () => {
        let timer = setTimeout(() => {
            this.setState({modalOpen: false});
            this.fixBody();
            timer && clearTimeout(timer);
        }, 0);
    };

    addModel = () => {
        let modelInfo = this.SelectModelNode.getInfo();
        let flag = checkCompleted(mandatoryFile, modelInfo);
        if (flag) {
            this.closeModal();
            this.setState({
                model: {
                    key: getTimeAndRandom(),
                    type: modelInfo.modelType,
                    title: modelInfo.title,
                    percent: 0,
                    images: []
                }
            })
        }
    };

    SelectModel = (model) => {
        if (model.key === 'custom') {
            this.setState({
                modalOpen: true
            });
            this.fixBody();
        } else {
            this.setState({
                model: model.data
            })
        }
    };

    getComponent = (modelItem) => {
        if (modelItem.type === 'progress') {
            return <Progress readOnly={true} percent={modelItem.percent} mode="charts" domKey={modelItem.key}/>
        }
        if (modelItem.type === 'protoAndProgress') {
            return <UploadAndProgress readOnly={true} percent={modelItem.percent} domKey={modelItem.key}/>
        }
        if (modelItem.type === 'proto') {
            return <UploadMulti readOnly={true}/>
        }
    };

    getInfo() {
        return this.state.model;
    }

    render() {
        const {modalOpen, model} = this.state;
        const {taskDeliveries = []} = this.props;
        return (
            <div>
                <div>
                    {
                        taskDeliveries.map((item, i) => {
                            return <Button key={i}
                                           basic
                                           className="upload-attach-button"
                                           onClick={() => this.SelectModel(item)}>{item.text}</Button>
                        })
                    }
                    <Button basic
                            className="upload-attach-button"
                            onClick={() => this.SelectModel({
                                key: "custom",
                                text: "自定义"
                            })}>自定义</Button>
                </div>

                {model.title ? <Segment className="story-upload-file add-task-attach">
                    <Header as='h4'>
                        <Header.Content>
                            <span className="underLine">
                                {model.title}
                            </span>
                        </Header.Content>
                    </Header>
                    {this.getComponent(model)}
                </Segment> : null}
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
            </div>
        );
    }
}

export default SelectAttach;
