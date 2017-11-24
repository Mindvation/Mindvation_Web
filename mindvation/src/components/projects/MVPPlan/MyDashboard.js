import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import ChangeStatus from './ChangeStatus';
import TaskSummary from './TaskSummary';
import StorySummary from '../../../containers/storySummary_container';
import $ from 'jquery';

class MyDashboard extends Component {

    state = {
        sprint: 1,
        taskId: '',
        storyId: ''
    };

    taskTaskDetail = (taskId) => {
        let targetElm = document.getElementById("myDashboardSticky");
        $(targetElm).animate({right: 0}, 500, this.closeStorySticky());
        this.setState({taskId: taskId})
    };

    taskStoryDetail = (storyId) => {
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: 0}, 500, this.closeTaskSticky());
        this.setState({storyId: storyId})
    };

    closeTaskSticky = () => {
        let targetElm = document.getElementById("myDashboardSticky");
        $(targetElm).animate({right: -400}, 500);
    };

    closeStorySticky = () => {
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: -400}, 500);
    };

    closeSticky = () => {
        this.closeTaskSticky();
        this.closeStorySticky();
    };

    render() {
        const {sprint, taskId, storyId} = this.state;
        const {id} = this.props.match.params;
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%'}} onClick={() => this.closeSticky()}>
                    <ChangeStatus
                        sprint={sprint} projectId={id}
                        taskDetail={(taskId) => {
                            this.taskTaskDetail(taskId)
                        }}
                        StoryDetail={(taskId) => {
                            this.taskStoryDetail(taskId)
                        }}
                    />
                </div>

                <div id="myDashboardSticky"
                     className="summary-rail">
                    <TaskSummary taskId={taskId}/>
                </div>
                <div id="dashboardSticky" className="summary-rail">
                    <StorySummary storyId={storyId}/>
                </div>
            </div>
        );
    }
}

export default DragDropContext(MyDashboard);