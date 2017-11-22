import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import ChangeStatus from './ChangeStatus';
import {Sidebar} from 'semantic-ui-react';
import TaskSummary from './TaskSummary';

class MyDashboard extends Component {

    state = {
        sprint: 1,
        visible: false,
        taskId: ''
    };

    previousSprint = () => {
        this.setState({
            visible: false,
            sprint: this.state.sprint - 1
        })
    };

    nextSprint = () => {
        this.setState({
            visible: false,
            sprint: this.state.sprint + 1
        })
    };

    checkDetail = (taskId) => {
        this.setState({visible: true, taskId: taskId})
    };

    render() {
        const {sprint, taskId, visible} = this.state;
        const {id} = this.props.match.params;
        return (
            <Sidebar.Pushable>
                <Sidebar
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    icon='labeled'
                >
                    <TaskSummary taskId={taskId}/>
                </Sidebar>
                <Sidebar.Pusher onClick={() => this.setState({visible: false})}>
                    <div>
                        {/*<Button style={{display: sprint > 1 ? 'inline-block' : 'none'}}
                                className="change-sprint-button" onClick={() => this.previousSprint()}>
                            <Icon name="chevron left"/>
                            Previous Sprint</Button>
                        <Button className="change-sprint-button" onClick={() => this.nextSprint()}>
                            Next Sprint
                            <Icon name="chevron right"/>
                        </Button>*/}
                        <ChangeStatus sprint={sprint} projectId={id} taskDetail={(taskId) => {
                            this.checkDetail(taskId)
                        }}/>
                        {/*<ChangeStatus storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }} sprint={sprint}/>*/}
                        {/*<MyDemoCalendar storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }} sprint={sprint}/>*/}
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default DragDropContext(MyDashboard);