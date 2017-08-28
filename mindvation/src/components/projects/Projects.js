import React, {Component} from 'react';
import ProjectsList from '../../containers/projectList_container';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';
import {updateGobalData} from '../../util/CommUtil';
import {assignOptions, contingencyOptions, priorityOptions, statusOptions} from "../../res/data/dummyData";
import {FormattedMessage} from 'react-intl';

class Projects extends Component {
    constructor() {
        super();
        updateGobalData("dummyData", {
            assignOptions: assignOptions,
            contingencyOptions: contingencyOptions,
            priorityOptions: priorityOptions,
            statusOptions: statusOptions
        })
    }

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
