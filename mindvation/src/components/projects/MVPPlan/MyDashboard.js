import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import ChangeStatus from './ChangeStatus';
import MyDemoCalendar from './MyDemoCalendar';
import {Sidebar, Icon, Button} from 'semantic-ui-react';

class MyDashboard extends Component {

    state = {
        sprint: 1,
        visible: false,
        storyId: ''
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

    checkDetail = (storyId) => {
        this.setState({visible: true, storyId: storyId})
    };

    render() {
        const {sprint, visible, storyId} = this.state;
        return (
            <Sidebar.Pushable>
                <Sidebar
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    icon='labeled'
                >
                    <div style={{backgroundColor: 'green', height: '150em'}}>{storyId}</div>
                </Sidebar>
                <Sidebar.Pusher>
                    <div className="component-container" onClick={() => this.setState({visible: false})}>
                        <Button style={{display: sprint > 1 ? 'inline-block' : 'none'}}
                                className="change-sprint-button" onClick={() => this.previousSprint()}>
                            <Icon name="chevron left"/>
                            Previous Sprint</Button>
                        <Button className="change-sprint-button" onClick={() => this.nextSprint()}>
                            Next Sprint
                            <Icon name="chevron right"/>
                        </Button>
                        <ChangeStatus storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }} sprint={sprint}/>
                        <MyDemoCalendar storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }} sprint={sprint}/>
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>

        );
    }
}

export default DragDropContext(MyDashboard);