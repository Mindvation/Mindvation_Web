import React, {Component} from 'react';
import AcceptContainer from '../../common/AcceptContainer';
import AcceptBox from '../../common/AcceptBox';
import {Grid, Header, Icon, List, Segment} from 'semantic-ui-react';
import {getMyTaskList, updateTaskStatus} from '../../../util/Service';

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
                text: 'To Do',
                tasks: taskList.toDo || [],
                accepts: []
            }, {
                key: 'inProgress',
                text: 'In Progress',
                tasks: taskList.inProgress || [],
                accepts: ['new']
            }, {
                key: 'done',
                text: 'Done',
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
        const {sprint} = this.props;
        return (
            <div className="components-item">
                <Header as='h3'>
                    <Icon name='plane'/>
                    <Header.Content>
                        Sprint {sprint}
                    </Header.Content>
                </Header>
                <Grid columns={3} className="mvp-project-container">
                    {
                        statuses.map((status, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="mvp-sprint-container">
                                    <div className="mvp-sprint-title">
                                        <span className="mvp-sprint-title-text">{status.text}</span>
                                    </div>
                                    <AcceptContainer data={status.key} accepts={status.accepts}>
                                        <List divided>
                                            {
                                                status.tasks.map((task, i) => {
                                                    return <List.Item
                                                        className={task.status === "inProgress" ? "mvp-project-AcceptBox story-in-progress " + "story-status-" + (task.subStatus ? task.subStatus : 'normal') : "mvp-project-AcceptBox"}
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
                                                                    <span
                                                                        className="mvp-story-id">{task.taskId}</span>
                                                                <span
                                                                    className="mvp-story-desc">{task.description}</span>
                                                                {/*<span className="mvp-story-priority">
                                                                {getDesc(priorityOptions, task.priority)}
                                                                </span>*/}
                                                            </div>
                                                        </AcceptBox>
                                                    </List.Item>
                                                })
                                            }
                                        </List>
                                    </AcceptContainer>
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid>
            </div>
        );
    }
}

export default MoveProject;