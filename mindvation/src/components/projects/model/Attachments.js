import React, {Component} from 'react';
import {Button, List, Modal, Header} from 'semantic-ui-react';
import {getTimeAndRandom, getRandomColor, checkCompleted} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import SelectModel from '../story/detail/SelectModel';

let mandatoryFile = ["title", "modelType"];

class Attachments extends Component {
    state = {
        attachments: [],
        modalOpen: false
    };

    getInfo = () => {
        return this.state.attachments;
    };

    closeModal = () => {
        let timer = setTimeout(() => {
            this.setState({modalOpen: false});
            timer && clearTimeout(timer);
        }, 0);
    };

    openModal = () => {
        this.setState({modalOpen: true});
    };

    addModel = () => {
        let modelInfo = this.SelectModelNode.getInfo();
        let flag = checkCompleted(mandatoryFile, modelInfo);
        if (flag) {
            this.closeModal();
            let tempData = this.state.attachments;
            tempData ?
                tempData.push({
                    key: getTimeAndRandom(),
                    type: modelInfo.modelType,
                    title: modelInfo.title,
                    color: getRandomColor()
                }) : tempData = [{
                    key: getTimeAndRandom(),
                    type: modelInfo.modelType,
                    title: modelInfo.title,
                    color: getRandomColor()
                }];
            this.setState({
                attachments: tempData
            })
        }
    };

    render() {
        const {attachments, modalOpen} = this.state;
        return (
            <div className="model-label-cont">
                <Header as='h4'>
                    <Header.Content>
                        任务交付件
                    </Header.Content>
                </Header>
                <div>
                    <Button basic onClick={() => this.openModal()}>
                        添加
                    </Button>
                </div>
                {
                    attachments && attachments.length > 0 ?
                        <List horizontal className="model-attach">
                            {attachments.map((attach) => {
                                return <List.Item key={attach.key}>
                                    <Button size="big" style={{backgroundColor: attach.color}}>
                                        {attach.title}
                                    </Button>
                                </List.Item>
                            })}
                        </List> : null
                }
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        <FormattedMessage
                            id='customModelTypeSelection'
                            defaultMessage='Custom Module Type Selection'
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

export default Attachments;