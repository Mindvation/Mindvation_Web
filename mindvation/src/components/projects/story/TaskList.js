import React, {Component} from 'react';
import {Grid, Segment, Image} from 'semantic-ui-react';
import Progress from '../../common/Progress';
import UploadMulti from '../../common/UploadMulti';
import UploadAndProgress from '../../common/UploadAndProgress';
import EditProgress from './detail/EditProgress';
import TaskHistory from './TaskHistory';
import {updateTaskStatus} from '../../../actions/story_action';
import {hasAuth} from '../../../util/AuthUtil';
import MVImage from '../../common/Image';
import {FormattedMessage} from 'react-intl';

class TaskList extends Component {
    state = {
        modelData: [],
        modalOpen: false
    };

    editProgress = (task) => {
        this.editProgressNode.openModal(task);
    };

    updateProgress = (task) => {
        this.props.dispatch(updateTaskStatus(task, () => {
            this.editProgressNode.closeModal();
        }));
    };

    checkTaskHistory = (task) => {
        this.taskHistoryNode.openModal(task)
    };

    getComponent = (task) => {
        const modelItem = task.model;
        if (modelItem.type === 'progress') {
            return <Progress percent={modelItem.percent} mode="charts" domKey={modelItem.key}
                             editProgress={() => this.editProgress(task)}
                             checkHistory={() => this.checkTaskHistory(task)}
                             readOnly={!hasAuth("updateTask", task.authCode)}/>
        }
        if (modelItem.type === 'protoAndProgress') {
            return <UploadAndProgress percent={modelItem.percent} domKey={modelItem.key}
                                      task={task}
                                      editProgress={() => this.editProgress(task)}
                                      checkHistory={() => this.checkTaskHistory(task)}
                                      readOnly={!hasAuth("updateTask", task.authCode)}/>
        }
        if (modelItem.type === 'proto') {
            return <UploadMulti task={task}
                                checkHistory={() => this.checkTaskHistory(task)}
                                readOnly={!hasAuth("updateTask", task.authCode)}/>
        }
    };

    render() {
        const {story} = this.props;
        return (
            <div>
                {story && story.tasks && story.tasks.length > 0 ? <Grid className="upload-attach-content" columns={3}>
                    {
                        story.tasks.map((task, i) => {
                            return <Grid.Column key={i} className="task-list-item">
                                <Segment className="task-upload-file">
                                    <div className="task-header">
                                        <div className="display-flex">
                                            <MVImage name="task"/>
                                            <span className="task-id">
                                                {task.idNumber}
                                            </span>
                                        </div>
                                        <span className="task-model-name">
                                            {task.model.title}
                                        </span>
                                    </div>
                                    <div className="task-desc">
                                        {task.description}
                                    </div>
                                    <div className="task-member">
                                        <FormattedMessage
                                            id='member'
                                            defaultMessage='Member'
                                        />
                                        {task.assignee ?
                                            <div className="table-single-line" key={i}>
                                                <Image verticalAlign="middle" src={task.assignee.avatar}
                                                       avatar/>
                                                <span>{task.assignee.name}</span>
                                            </div> : null
                                        }
                                    </div>
                                    <div className="task-model">
                                        {this.getComponent(task)}
                                    </div>
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid> : null}
                <EditProgress updateProgress={(model) => this.updateProgress(model)}
                              ref={node => this.editProgressNode = node}/>
                <TaskHistory ref={node => this.taskHistoryNode = node}/>
            </div>
        );
    }
}

export default TaskList;