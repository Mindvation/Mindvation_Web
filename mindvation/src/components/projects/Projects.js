import React, {Component} from 'react';
import ProjectsList from './ProjectsList';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';
import ECharts from './ECharts';

class Projects extends Component {
    render() {
        const {dispatch, projectList} = this.props;
        return (
            <div className="project-content">
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"Project-title UnderLine"}>
                        PROJECTS
                    </Header.Content>
                </Header>
                <ProjectsList
                    projectList={projectList}
                />
                <CreateProject
                    dispatch={dispatch}
                />
                <ECharts/>
            </div>
        );
    }
}

export default Projects;
