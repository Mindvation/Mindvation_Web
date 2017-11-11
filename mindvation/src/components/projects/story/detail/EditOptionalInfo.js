import React, {Component} from 'react';
import {Header, Icon, Modal, Button, List} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import OptionalItem from '../OptionalItem';
import {updateStoryOptional} from '../../../../actions/story_action';
import DisplayFile from '../../../common/DisplayFile';

let optionalModule;

class EditOptionalInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.setState({modalOpen: false});
    };

    edit = () => {
        this.openModal();
    };

    update = () => {
        let optionalInfo = optionalModule.getInfo();
        optionalInfo.storyId = this.props.story.storyId;
        this.props.dispatch(updateStoryOptional(optionalInfo, function () {
            this.closeModal();
        }.bind(this)));
    };

    render() {
        const {modalOpen} = this.state;
        const {story, dispatch, disabled} = this.props;
        return (
            <div className="read-only-component">
                {/*<Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='optionalItems'
                        defaultMessage='Optional Items'
                    />
                    {
                        disabled ? null :
                            <div className="edit-line-cont">
                                <div className="edit-info-line"/>
                                <div className="edit-info-icon" onClick={this.edit}>
                                    <Icon name='pencil'/>
                                </div>
                            </div>
                    }
                </Header>*/}
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editOptionalItems'
                        defaultMessage='Edit Optional Items'
                    />
                </div>}
                <div className="edit-detail-info">
                    <ReadOnly icon="attach" title="Attachments"
                              value={story.fileList && story.fileList.length > 0 ?
                                  <DisplayFile fileList={story.fileList}/> : ""}/>
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <OptionalItem
                        info={story}
                        dispatch={dispatch}
                        ref={node => {
                            optionalModule = node
                        }}
                        showAction={true}
                    />
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.update()}>
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

export default EditOptionalInfo;
