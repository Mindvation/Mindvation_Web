import React, {Component} from 'react';
import ProjectsList from '../../containers/updateProjectList';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';

class Projects extends Component {
    render() {
        return (
            <div>
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"Project-title UnderLine"}>
                        PROJECTS
                    </Header.Content>
                </Header>
                <ProjectsList/>
                <CreateProject/>
            </div>
        );
    }
}

export default Projects;
