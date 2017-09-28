import React, {Component} from 'react';
import {Grid, Segment, Image} from 'semantic-ui-react';
import Progress from '../../common/Progress';
import UploadMulti from '../../common/UploadMulti';
import UploadAndProgress from '../../common/UploadAndProgress';
import EditProgress from './detail/EditProgress';
import {FormattedMessage} from 'react-intl';
import {updateStory} from '../../../actions/story_action';
import AddTask from './AddTask';

class UploadAttach extends Component {
    state = {
        modelData: [],
        modalOpen: false
    };

    editProgress = (model) => {
        this.editProgressNode.openModal(model);
    };

    updateProgress = () => {
        this.props.dispatch(updateStory(this.props.story))
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
    };

    render() {
        const {story} = this.props;
        return (
            <div>
                {story && story.tasks && story.tasks.length > 0 ? <Grid className="upload-attach-content" columns={3}>
                    {
                        story.tasks.map((task, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="task-upload-file">
                                    <div className="task-header">
                                        <span className="task-id">
                                            {task.idNumber}
                                        </span>
                                        <span className="task-model-name">
                                            {task.model.title}
                                        </span>
                                    </div>
                                    <div className="task-desc">
                                        {task.description}
                                    </div>
                                    <div className="task-member">
                                        Members
                                        {task.assignee.map((member, i) => {
                                            return <div className="table-single-line" key={i}>
                                                <Image verticalAlign="middle" src={member.image.src}
                                                       avatar/>
                                                <span>{member.text}</span>
                                            </div>
                                        })}
                                    </div>
                                    {this.getComponent(task.model)}
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid> : null}
                <EditProgress updateProgress={(model) => this.updateProgress(model)}
                              ref={node => this.editProgressNode = node}/>
            </div>
        );
    }
}

export default UploadAttach;
