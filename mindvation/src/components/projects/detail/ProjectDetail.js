import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import {FormattedMessage} from 'react-intl';
import {getProjectById, updateProjectStatus} from '../../../actions/project_action';
import EfficiencyDiagram from './EfficiencyDiagram';
import BurnDownChart from './BurnDownChart';
import EfficiencyDashboard from './EfficiencyDashboard';
import ProgressDashboard from './ProgressDashboard';
import Carousel from '../../common/Carousel';
import Requirement from '../requirement/Requirement';
import EditStatus from "../EditStatus";
import {hasAuth} from '../../../util/AuthUtil';
import {
    Link
} from 'react-router-dom';

class ProjectDetail extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getProjectById(id));
    };

    changeStatus = (project, status, percent = 0) => {
        /*Object.assign(project.status, {
            status,
            percent
        });*/
        const statusInfo = {
            projectId: project.projectId,
            status,
            percent
        };
        this.props.dispatch(updateProjectStatus(statusInfo));
    };

    render() {
        const {project, dispatch} = this.props;
        return (
            <div className="project-detail">
                <Header as='h4'>
                    <Header.Content>
                        <span className={"underLine header-project"}>
                            <FormattedMessage
                                id='projectsUpper'
                                defaultMessage='PROJECTS'
                            />
                        </span>{'>'}
                        <span className={"underLine header-id"}>{project.projectId}</span>
                    </Header.Content>
                </Header>
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment padded>
                            <EditStatus status={project.status} isStory={true}
                                        disabled={!hasAuth("updateProjectStatus", project.authCode)}
                                        changeStatus={(status, percent) => this.changeStatus(project, status, percent)}/>
                            <EditBasicInfo project={project} dispatch={dispatch}
                                           disabled={!hasAuth("updateProject", project.authCode)}/>
                            <EditAdditionalInfo project={project} dispatch={dispatch}
                                                disabled={!hasAuth("updateProject", project.authCode)}/>
                            <EditOptionalInfo project={project} dispatch={dispatch}
                                              disabled={!hasAuth("updateProject", project.authCode)}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-right">
                        {/*<Grid columns={2}>
                            <Grid.Column width={11}>
                                <Segment padded className="e-charts-segment">
                                    <EfficiencyDiagram/>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={5} className="grid-component-right">
                                <Carousel>
                                    <div className="e-charts-segment-right">
                                        <div className="e-charts-small">
                                            <BurnDownChart/>
                                        </div>
                                        <div className="e-charts-small">
                                            <EfficiencyDashboard/>
                                        </div>
                                        <div className="e-charts-small">
                                            <ProgressDashboard/>
                                        </div>
                                    </div>
                                </Carousel>
                            </Grid.Column>
                        </Grid>*/}
                        <Grid.Row>
                            <Segment>
                                <Requirement/>
                            </Segment>
                            <Segment>
                                <Link style={{border: '1px solid #1b1c1d'}} className="create-requirement-button"
                                      to={`/home/MVPDashboard/${project.projectId}`}>
                                    MVP Dashboard
                                </Link>
                                <Link style={{border: '1px solid #1b1c1d', marginLeft: '2em'}}
                                      className="create-requirement-button"
                                      to={`/home/MyMVPDashboard/${project.projectId}`}>
                                    My MVP Dashboard
                                </Link>
                            </Segment>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default ProjectDetail;
