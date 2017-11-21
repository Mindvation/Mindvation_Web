import React, {Component} from 'react';
import {Header, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ReadOnly from '../../common/ReadOnly';
import DisplayFile from '../../common/DisplayFile';
import {getTaskById} from '../../../util/Service';
import {
    withRouter
} from 'react-router-dom';

class TaskSummary extends Component {
    state = {task: {}};

    /*componentDidMount() {
        const {taskId} = this.props;
        if (!taskId) return;
        getTaskById(taskId, function (task) {
            this.setState({
                task: task
            })
        }.bind(this));
    };*/

    componentWillReceiveProps(nextProps) {
        const {taskId} = nextProps;
        if (taskId === this.props.taskId) return;
        getTaskById(taskId, function (task) {
            this.setState({
                task: task
            })
        }.bind(this));
    }

    goToStoryDetail = (taskId) => {
        this.props.history.push(`/home/story/${taskId}`)
    };

    render() {
        const {linkToStory = true} = this.props;
        const {task} = this.state;
        return (
            <div>
                <div className="summary-id">
                    {task.idNumber}
                </div>
                {linkToStory ? <div className="summary-link" onClick={(() => this.goToStoryDetail(task.storyId))}>
                    <FormattedMessage
                        id='goToWorkflow'
                        defaultMessage='Go to Workflow'
                    />
                </div> : null}
                <div className="task-summary">
                    <ReadOnly icon="book" title="Description"
                              value={task.description}/>
                    <ReadOnly icon="clock" title="Start / End Date"
                              value={task.startDate && task.endDate ? task.startDate + " ~ " + task.endDate : ""}/>
                    <ReadOnly icon="percent" title="Progress"
                              value={task.progress}/>
                    <ReadOnly icon="attach" title="Attachments Type"
                              value={task.model ? task.model.title : ""}/>
                    <ReadOnly icon="attach" title="Attachments"
                              value={task.fileList && task.fileList.length > 0 ?
                                  <DisplayFile fileList={task.fileList}/> : ""}/>
                </div>
            </div>
        );
    }
}

export default withRouter(TaskSummary);
