import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import MoveProject from './MoveProject';
import {Header, Icon} from 'semantic-ui-react';

class Dashboard extends Component {

    render() {
        return (
            <div className="component-container">
                <Header as='h3'>
                    <Icon name='dashboard'/>
                    <Header.Content>
                        Dashboard
                    </Header.Content>
                </Header>
                <MoveProject/>
            </div>

        );
    }
}

export default DragDropContext(Dashboard);