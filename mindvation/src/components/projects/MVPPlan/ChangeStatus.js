import React, {Component} from 'react';
import AcceptContainer from '../../common/AcceptContainer';
import AcceptBox from '../../common/AcceptBox';
import {Grid} from 'semantic-ui-react';
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
        }, function () {
            let tempStatues = this.state.statuses;
            tempStatues.map((item) => {
                if (item.key === status.name) {
                    task.task.status = item.key;
                    item.tasks.push(task.task);
                }
                if (item.key === task.lastStatus) {
                    item.tasks.splice(item.tasks.indexOf(task.task), 1);
                }
            });
            this.setState({
                statuses: tempStatues
            })
        }.bind(this))
    };

    checkDetail = (event, taskId) => {
        event.stopPropagation();
        const {taskDetail} = this.props;
        taskDetail && taskDetail(taskId);
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
                                        status.tasks.map((task, i) => {
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
                                                         onClick={(event) => this.checkDetail(event, task.taskId)}>
                                                        <div className="mvp-story-id display-flex">
                                                            <Image
                                                                name={task.priority ? "priority_" + task.priority : "priority_1"}/>
                                                            {task.taskId}
                                                        </div>
                                                        <div className="mvp-story-desc">{task.description}</div>
                                                        {/*<span className="mvp-story-priority">
                                                                {getDesc(priorityOptions, task.priority)}
                                                                </span>*/}
                                                    </div>
                                                </AcceptBox>
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