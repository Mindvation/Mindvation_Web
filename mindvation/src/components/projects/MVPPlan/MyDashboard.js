import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import ChangeStatus from './ChangeStatus';
import {Header, Icon} from 'semantic-ui-react';

class MyDashboard extends Component {

    render() {
        return (
            <div className="component-container">
                <Header as='h3'>
                    <Icon name='dashboard'/>
                    <Header.Content>
                        Dashboard
                    </Header.Content>
                </Header>
                <ChangeStatus/>
            </div>

        );
    }
}

export default DragDropContext(MyDashboard);