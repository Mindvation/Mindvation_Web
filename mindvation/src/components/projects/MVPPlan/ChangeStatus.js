import React, {Component} from 'react';
import AcceptContainer from '../../common/AcceptContainer';
import AcceptBox from '../../common/AcceptBox';
import {Grid} from 'semantic-ui-react';
import {priorityOptions} from '../../../res/data/dataOptions';
import {getDesc} from '../../../util/CommUtil';
import {getMyTaskList, updateTaskStatus} from '../../../util/Service';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';

class MoveProject extends Component {
    state = {
        statuses: []
    };

    componentWillMount() {
        const {projectId} = this.props;
        getMyTaskList(projectId, function (taskList) {
            this.formatTaskStatusData(taskList);
        }.bind(this));
    }

    formatTaskStatusData = (taskList) => {
        const taskStatus = [
            {
                key: 'new',
                text: <FormattedMessage
                    id='toDo'
                    defaultMessage='To Do'
                />,
                tasks: taskList.toDo || [],
                accepts: []
            }, {
                key: 'inProgress',
                text: <FormattedMessage
                    id='inProgress'
                    defaultMessage='In Progress'
                />,
                tasks: taskList.inProgress || [],
                accepts: ['new']
            }, {
                key: 'done',
                text: <FormattedMessage
                    id='done'
                    defaultMessage='Done'
                />,
                tasks: taskList.done || [],
                accepts: ['inProgress']
            }
        ];

        this.setState({
            statuses: taskStatus
        })
    };

    moveProjectToNext = (task, status) => {
        if (task.lastStatus === status.key) return;
        updateTaskStatus({
            taskId: task.task.taskId,
            status: status.name
        }, function (taskList) {
            this.formatTaskStatusData(taskList);
        }.bind(this))
    };

    checkTaskDetail = (event, taskId) => {
        event.stopPropagation();
        const {taskDetail} = this.props;
        taskDetail && taskDetail(taskId);
    };

    checkStoryDetail = (event, taskId) => {
        event.stopPropagation();
        const {StoryDetail} = this.props;
        StoryDetail && StoryDetail(taskId);
    };

    render() {
        const {statuses} = this.state;
        return (
            <div>
                <div className="project-header">
                    <Image name='dashboard'/>
                    <FormattedMessage
                        id='dashboard'
                        defaultMessage='Dashboard'
                    />
                </div>
                <Grid columns={3} className="mvp-grid-column">
                    {
                        statuses.map((status, i) => {
                            return <Grid.Column key={i}>
                                <div className={"mvp-sprint-title sprint-title-" + status.key}>
                                    <span
                                        className="mvp-sprint-title-text">{status.text}</span>
                                </div>
                                <AcceptContainer data={status.key} accepts={status.accepts}>
                                    {
                                        status.tasks.map((task, j) => {
                                            return <div key={j}>
                                                <div className="mvp-story-AcceptBox">
                                                    <div
                                                        onClick={(event) => this.checkStoryDetail(event, task.story.storyId)}
                                                        className="mvp-story-info host-mvp-story">
                                                        <div className="mvp-story-id display-flex"
                                                             style={{justifyContent: "space-between"}}>
                                                            <div>
                                                                <Image
                                                                    name={task.story.priority ? "priority_" + task.story.priority : "priority_1"}/>
                                                                {task.story.storyId}
                                                            </div>
                                                            <div className="display-flex">
                                                                <div className="mvp-story-priority">
                                                                    {getDesc(priorityOptions, task.story.priority)}
                                                                </div>
                                                                <div
                                                                    className="mvp-story-point">{task.story.storyPoint}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mvp-story-desc read-only-text">
                                                            <div className="simditor">
                                                                <div className="simditor-body"
                                                                     dangerouslySetInnerHTML={{__html: task.story.description}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {task.tasks.map((task, i) => {
                                                    return <div
                                                        className={"mvp-task-AcceptBox " + (task.status === "inProgress" ? "story-in-progress " : "")}
                                                        key={i}>
                                                        <AcceptBox
                                                            data={{
                                                                'task': task,
                                                                'lastStatus': status.key
                                                            }}
                                                            type={task.status}
                                                            action={(handleData, status) => this.moveProjectToNext(handleData, status)}>
                                                            <div className="mvp-story-info"
                                                                 onClick={(event) => this.checkTaskDetail(event, task.taskId)}>
                                                                <div className="mvp-story-id display-flex">
                                                                    <Image
                                                                        name={task.priority ? "priority_" + task.priority : "priority_1"}/>
                                                                    {task.taskId}
                                                                </div>
                                                                <div className="mvp-story-desc">{task.description}</div>
                                                            </div>
                                                        </AcceptBox>
                                                    </div>
                                                })}
                                            </div>
                                        })
                                    }

                                </AcceptContainer>
                            </Grid.Column>
                        })
                    }
                </Grid>
            </div>
        );
    }
}

export default MoveProject;