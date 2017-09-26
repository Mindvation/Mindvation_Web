import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import MoveProject from './MoveProject';
import {Sidebar} from 'semantic-ui-react';
import DemoCalendar from './DemoCalendar';
import StorySummary from '../../../containers/storySummary_container';

class Dashboard extends Component {
    state = {
        visible: false,
        storyId: ''
    };

    checkDetail = (storyId) => {
        this.setState({visible: true, storyId: storyId})
    };

    render() {
        const {visible, storyId} = this.state;
        return (
            <Sidebar.Pushable>
                <Sidebar
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    icon='labeled'
                >
                    <StorySummary storyId={storyId} linkToStory={false}/>
                </Sidebar>
                <Sidebar.Pusher>
                    <div className="component-container" onClick={() => this.setState({visible: false})}>
                        <MoveProject storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }}/>
                        <DemoCalendar storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }}/>
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default DragDropContext(Dashboard);