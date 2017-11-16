import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import OptionalItem from './OptionalItem';
import {addStoryToList} from '../../../actions/stories_action';
import {clearTempTask} from '../../../actions/task_action';
import {checkCompleted} from '../../../util/CommUtil';
import {hasAuth} from '../../../util/AuthUtil';

let basicModule, optionalModule, AdditionalModule;
let mandatoryFile = ["summary", "description"];

class CreateRequirement extends Component {
    state = {modalOpen: false, storyType: 'story'};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.props.dispatch(clearTempTask());
        this.setState({modalOpen: false});
    };

    createTempStory = (type) => {
        this.setState({storyType: type});
        this.openModal();
    };

    newStory = () => {
        let basicInfo = basicModule.getInfo();
        let optionalInfo = optionalModule.getInfo();
        let additionalInfo = AdditionalModule.getInfo();
        let storyInfo = Object.assign(basicInfo, additionalInfo, optionalInfo);
        storyInfo.comments = [];
        let flag = checkCompleted(mandatoryFile, storyInfo);
        if (flag) {
            //this.formatStory(storyInfo);
            storyInfo.projectId = this.props.requirement.projectId;
            storyInfo.reqId = this.props.requirement.reqId;
            storyInfo.type = this.state.storyType;
            this.props.dispatch(addStoryToList(storyInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {dispatch, requirement} = this.props;
        return (
            <div>
                <div className="create-story-buttons">
                    {hasAuth("createStory", requirement.authCode) ?
                        <div className="create-button"
                             onClick={() => this.createTempStory('story')}>
                            + <FormattedMessage
                            id='createStory'
                            defaultMessage='Create Story'
                        />
                        </div> : null}
                    {hasAuth("createStory", requirement.authCode) ?
                        <div className="create-button"
                             onClick={() => this.createTempStory('cr')}>
                            + <FormattedMessage
                            id='createChangeRequest'
                            defaultMessage='Create Change Request'
                        />
                        </div> : null}
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        {this.state.storyType === 'story' ? <FormattedMessage
                            id='createStory'
                            defaultMessage='Create Story'
                        /> : <FormattedMessage
                            id='createChangeRequest'
                            defaultMessage='Create Change Request'
                        />}
                    </Modal.Header>
                    <BasicInfo ref={node => {
                        basicModule = node
                    }}/>
                    <AdditionalInfo
                        ref={node => {
                            AdditionalModule = node
                        }}
                        requirement={requirement}
                    />
                    <OptionalItem
                        dispatch={dispatch}
                        ref={node => {
                            optionalModule = node
                        }}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newStory()}>
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

export default CreateRequirement;
