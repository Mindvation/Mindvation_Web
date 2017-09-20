import React, {Component} from 'react';
import {Grid, Segment, Button, Header, Icon, Modal} from 'semantic-ui-react';
import BurnDownChart from '../../detail/BurnDownChart';
import EfficiencyDashboard from '../../detail/EfficiencyDashboard';
import Progress from '../../../common/Progress';
import UploadMulti from '../../../common/UploadMulti';
import UploadAndProgress from '../../../common/UploadAndProgress';
import {getTimeAndRandom, checkCompleted} from '../../../../util/CommUtil';
import SelectModule from './SelectModule';
import EditProgress from './EditProgress';
import {FormattedMessage} from 'react-intl';

let mandatoryFile = ["title", "moduleType"];

const moduleMapping = [
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
        moduleArray: [],
        moduleData: [],
        modalOpen: false
    };

    closeModal = () => {
        let timer = setTimeout(() => {
            this.setState({modalOpen: false});
            timer && clearTimeout(timer);
        }, 0);
    };

    addModule = () => {
        let moduleInfo = this.selectModuleNode.getInfo();
        let flag = checkCompleted(mandatoryFile, moduleInfo);
        if (flag) {
            this.closeModal();
            let tempData = this.state.moduleData;
            tempData.push({
                key: getTimeAndRandom(),
                type: moduleInfo.moduleType,
                title: moduleInfo.title,
                percent: 0,
                custom: true,
                images: []
            });
            this.setState({
                moduleData: tempData
            })
        }
    };

    editProgress = (module) => {
        this.editProgressNode.openModal(module);
    };

    updateProgress = (module) => {
        let tempData = this.state.moduleData;
        tempData.some((tempModule) => {
            if (tempModule.key === module.key) {
                tempModule.percent = module.percent;
                return true;
            }
        });
        this.setState({
            moduleData: tempData
        })
    };

    selectModule = (module) => {
        let tempArray = this.state.moduleData;
        if (module.key === 'custom') {
            this.setState({
                modalOpen: true
            })
        } else {
            if (tempArray.indexOf(module.data) === -1) {
                tempArray.push(module.data);
                this.setState({
                    moduleData: tempArray
                })
            }
        }
    };

    removeCustomModel = (module) => {
        let tempArray = this.state.moduleData;
        if (tempArray.indexOf(module) !== -1) {
            tempArray.splice(tempArray.indexOf(module), 1);
            this.setState({
                moduleData: tempArray
            })
        }
    };

    getComponent = (moduleItem) => {
        if (moduleItem.type === 'progress') {
            return <Progress percent={moduleItem.percent} mode="charts" domKey={moduleItem.key}
                             editProgress={() => this.editProgress(moduleItem)}/>
        }
        if (moduleItem.type === 'protoAndProgress') {
            return <UploadAndProgress percent={moduleItem.percent} domKey={moduleItem.key}
                                      editProgress={() => this.editProgress(moduleItem)}/>
        }
        if (moduleItem.type === 'proto') {
            return <UploadMulti/>
        }
        if (moduleItem.type === 'prototypeMap') {
            return <UploadMulti/>
        }
        if (moduleItem.type === 'UIMap') {
            return <EfficiencyDashboard/>
        }
        if (moduleItem.type === 'logicMap') {
            return <BurnDownChart/>
        }
        if (moduleItem.type === 'testCase') {
            return <UploadAndProgress/>
        }
    };

    render() {
        const {modalOpen, moduleData} = this.state;
        return (
            <div>
                <div>
                    {
                        moduleMapping.map((item, i) => {
                            return <Button key={i}
                                           basic
                                           className="upload-attach-button"
                                           onClick={() => this.selectModule(item)}>{item.text}</Button>
                        })
                    }
                </div>
                {moduleData.length > 0 ? <Grid className="upload-attach-content" columns={3}>
                    {
                        moduleData.map((module, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="story-upload-file">
                                    <Header as='h4'>
                                        <Header.Content>
                                            <span className="underLine">
                                                {module.title}
                                            </span>
                                        </Header.Content>
                                    </Header>
                                    {this.getComponent(module)}
                                    {module.custom ?
                                        <Icon name="trash" size="big" className={"custom-module-delete pointer-cursor"}
                                              onClick={() => this.removeCustomModel(module)}/> : null}
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
                            id='customModuleTypeSelection'
                            defaultMessage='Custom Module Type Selection'
                        />
                    </Modal.Header>
                    <SelectModule ref={node => this.selectModuleNode = node}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.addModule()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <EditProgress updateProgress={(module) => this.updateProgress(module)}
                              ref={node => this.editProgressNode = node}/>
            </div>
        );
    }
}

export default UploadAttach;
