import React, {Component} from 'react';
import ProjectsList from '../../containers/projectList_container';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';

import {FormattedMessage} from 'react-intl';

class Projects extends Component {
    render() {
        const {dispatch} = this.props;
        return (
            <div className="project-content">
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='projectsUpper'
                            defaultMessage='PROJECTS'
                        />
                    </Header.Content>
                </Header>
                <ProjectsList/>
                <CreateProject
                    dispatch={dispatch}
                />
            </div>
        );
    }
}

export default Projects;
