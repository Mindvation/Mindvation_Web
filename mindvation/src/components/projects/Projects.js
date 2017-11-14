import React, {Component} from 'react';
import ProjectsList from '../../containers/projectList_container';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';
import Image from '../common/Image';

import {FormattedMessage} from 'react-intl';

class Projects extends Component {
    render() {
        const {dispatch} = this.props;
        return (
            <div>
                <div className="project-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='projectsUpper'
                        defaultMessage='PROJECTS'
                    />
                </div>
                <CreateProject
                    dispatch={dispatch}
                />
                <ProjectsList/>
            </div>
        );
    }
}

export default Projects;
