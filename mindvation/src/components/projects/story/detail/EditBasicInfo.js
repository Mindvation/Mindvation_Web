import React, {Component} from 'react';
import {Modal, Button, Image} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../BasicInfo';
import {checkValid, getDataInfo} from '../../../../util/CommUtil';
import {updateStoryBasic} from '../../../../actions/story_action';

class EditBasicInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let basicInfo = this.basicModule.getInfo();
        let flag = checkValid(basicInfo);
        if (flag) {
            basicInfo = getDataInfo(basicInfo);
            basicInfo.storyId = this.props.story.storyId;
            this.props.dispatch(updateStoryBasic(basicInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {story, disabled} = this.props;
        return (
            <div className="read-only-component">
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editBasicInfo'
                        defaultMessage='Edit Basic info'
                    />
                </div>}
                <div className="edit-detail-info">
                    <ReadOnly title="Summary" value={story.summary}/>
                    <ReadOnly title="Description" type="html"
                              value={story.description}/>
                    {story.creatorInfo ? <ReadOnly title="Creator" value={<div>
                        <Image verticalAlign="middle" src={story.creatorInfo.avatar}
                               avatar/>
                        <span>{story.creatorInfo.name}</span>
                    </div>}/> : null}
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <BasicInfo
                        info={story}
                        ref={node => {
                            this.basicModule = node
                        }}
                        isEdit={true}
                    />
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.update()}>
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

export default EditBasicInfo;
