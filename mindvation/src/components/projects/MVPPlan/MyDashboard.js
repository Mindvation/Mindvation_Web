import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import ChangeStatus from './ChangeStatus';
import {Rail, Sticky} from 'semantic-ui-react';
import TaskSummary from './TaskSummary';
import $ from 'jquery';

class MyDashboard extends Component {

    state = {
        sprint: 1,
        taskId: ''
    };

    checkDetail = (taskId) => {
        let targetElm = document.getElementById("myDashboardSticky");
        $(targetElm).animate({right: 0}, 500);
        this.setState({taskId: taskId})
    };

    closeSticky = () => {
        let targetElm = document.getElementById("myDashboardSticky");
        $(targetElm).animate({right: -400}, 500);
    };

    render() {
        const {sprint, taskId} = this.state;
        const {id} = this.props.match.params;
        return (
            <div onClick={() => this.closeSticky()}>
                <ChangeStatus
                    sprint={sprint} projectId={id}
                    taskDetail={(taskId) => {
                        this.checkDetail(taskId)
                    }}
                />

                <Rail id="myDashboardSticky" position='right' className="summary-rail">
                    <Sticky>
                        <TaskSummary taskId={taskId}/>
                    </Sticky>
                </Rail>
            </div>
        );
    }
}

export default DragDropContext(MyDashboard);