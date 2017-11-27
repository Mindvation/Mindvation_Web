import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Simditor from '../../../common/Simditor';
import {updateStoryRemark} from '../../../../actions/story_action';
import {getStaffId} from '../../../../util/UserStore';
import {dateFormat} from '../../../../util/CommUtil';

class StoryRemark extends Component {

    state = {isEdit: false};

    openModal = () => this.setState({isEdit: true});

    closeModal = () => this.setState({isEdit: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        const remarkInfo = {
            creatorId: getStaffId(),
            storyInfo: {
                storyId: this.props.story.storyId
            },
            noteDesc: this.remarksNode.getValue()
        };
        this.props.dispatch(updateStoryRemark(remarkInfo, this.closeModal));
    };

    render() {
        const {isEdit} = this.state;
        const {story, disabled} = this.props;
        return (
            <div className="read-only-component">
                {disabled || isEdit ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editMinute'
                        defaultMessage='Edit Minute'
                    />
                </div>}
                {isEdit ?
                    <div className="components-item">
                        <Simditor fullWidth={true} defaultValue={story.storyNote.noteDesc}
                                  ref={node => this.remarksNode = node}/>
                        <div className="edit-remark-action">
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
                        </div>
                    </div> :
                    <div className="edit-detail-info">
                        {story.storyNote && story.storyNote.creatorInfo ?
                            <div>
                                <div className="display-flex">
                                    <Image verticalAlign="middle"
                                           src={story.storyNote.creatorInfo.avatar}
                                           avatar/>
                                    <span>{story.storyNote.creatorInfo.name}</span>
                                </div>
                                <div className="story-remark-time">
                                    {story.storyNote.lastUpdateTime ? dateFormat(new Date(story.storyNote.lastUpdateTime), 'yyyy-MM-dd hh:mm:ss') : ''}
                                </div>
                            </div> : null
                        }
                        <div className="story-remark-text read-only-text">
                            <div className="simditor">
                                <div className="simditor-body"
                                     dangerouslySetInnerHTML={{__html: story.storyNote && story.storyNote.noteDesc || "N/A"}}/>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default StoryRemark;