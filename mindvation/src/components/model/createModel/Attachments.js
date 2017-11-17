import React, {Component} from 'react';
import {Button, List, Modal} from 'semantic-ui-react';
import {getTimeAndRandom, checkCompleted, getRandomStyle} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import SelectModel from '../../projects/story/SelectModel';
import Image from '../../common/Image';

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
                    style: getRandomStyle()
                }) : tempData = [{
                    key: getTimeAndRandom(),
                    type: modelInfo.modelType,
                    title: modelInfo.title,
                    style: getRandomStyle()
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
                <div className="common-text">
                    <FormattedMessage
                        id='taskAttachments'
                        defaultMessage='Task Attachments'
                    />
                </div>
                <div className="iteration-main">
                    <Button className="confirm-button" onClick={() => this.openModal()}>
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
                                    <div className={"list-content tag-selected tag-style-" + (attach.style || 'default')}>
                                        <span className="list-text">{attach.title}</span>
                                        <div className="list-actions-content">
                                            <div className="list-actions pointer-cursor"
                                                 onClick={() => this.removeModel(attachments, attach)}>
                                                <Image name="trash" style={{marginRight: 0}}/>
                                            </div>
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
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.addModel()}>
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