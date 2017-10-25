import React, {Component} from 'react';
import {Button, List, Modal, Header, Icon} from 'semantic-ui-react';
import {getTimeAndRandom, getRandomColor, checkCompleted} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import SelectModel from '../../projects/story/SelectModel';

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

    removeModel = (attachments, attach) => {
        attachments.splice(attachments.indexOf(attach), 1);
        this.setState({
            attachments: attachments
        });
    };

    render() {
        const {attachments, modalOpen} = this.state;
        return (
            <div className="model-label-cont">
                <Header as='h4'>
                    <Header.Content>
                        <FormattedMessage
                            id='taskAttachments'
                            defaultMessage='Task Attachments'
                        />
                    </Header.Content>
                </Header>
                <div>
                    <Button primary onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='add'
                            defaultMessage='Add'
                        />
                    </Button>
                </div>
                {
                    attachments && attachments.length > 0 ?
                        <List horizontal className="model-attach">
                            {attachments.map((attach) => {
                                return <List.Item key={attach.key}>
                                    <div className="list-content" style={{backgroundColor: attach.color}}>
                                        <span className="list-text">{attach.title}</span>
                                        <div className="list-actions-content">
                                            <span className="list-actions">
                                                {/*<Icon name="pencil"
                                                      className={"list-action-icon pointer-cursor"}
                                                      onClick={() => this.editModel(attachments, attach)}
                                                />*/}
                                                <Icon name="trash"
                                                      className={"list-action-icon pointer-cursor"}
                                                      onClick={() => this.removeModel(attachments, attach)}
                                                />
                                            </span>
                                        </div>
                                    </div>
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