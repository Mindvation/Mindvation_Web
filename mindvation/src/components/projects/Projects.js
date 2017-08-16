import React, {Component} from 'react';
import ProjectsList from './ProjectsList';
import {Button, Header, Icon} from 'semantic-ui-react';
import './Projects.css';

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
                <Button color='blue'>+ Create Project</Button>
            </div>
        );
    }
}

export default Projects;
