import React, {Component} from 'react';
import ProjectsList from '../../containers/projectList_container';
import {Header, Icon} from 'semantic-ui-react';
import './Projects.css';
import CreateProject from './CreateProject';
import {updateGobalData} from '../../util/CommUtil';
import {assignOptions, contingencyOptions, priorityOptions} from "../../res/data/dummyData";

class Projects extends Component {
    constructor() {
        super();
        updateGobalData("dummyData", {
            assignOptions: assignOptions,
            contingencyOptions: contingencyOptions,
            priorityOptions: priorityOptions
        })
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div className="project-content">
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"Project-title UnderLine"}>
                        PROJECTS
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
