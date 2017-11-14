import React, {Component} from 'react';
import {Grid, Header, Segment, Tab, Menu, Icon} from 'semantic-ui-react';
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
import Image from '../../common/Image';

class ProjectDetail extends Component {
    state = {activeTab: 0};

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
        const {activeTab} = this.state;
        const panes = [
            {
                menuItem: <Menu.Item key="basicInfo">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 0 ? "basic_selected" : "basic_unselected"}/>
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditBasicInfo project={project} dispatch={dispatch}
                                       disabled={!hasAuth("updateProject", project.authCode)}/>
                    </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="additionalInfo">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 1 ? "additional_selected" : "additional_unselected"}/>
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='additional Info'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditAdditionalInfo project={project} dispatch={dispatch}
                                            disabled={!hasAuth("updateProject", project.authCode)}/>
                    </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="optionalItems">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 2 ? "optional_selected" : "optional_unselected"}/>
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditOptionalInfo project={project} dispatch={dispatch}
                                          disabled={!hasAuth("updateProject", project.authCode)}/>
                    </Tab.Pane>
            }
        ];

        return (
            <div className="project-detail">
                <div className="header-project">
                    <span className="header-project-text">
                        <FormattedMessage
                            id='projectsUpper'
                            defaultMessage='PROJECTS'
                        />
                        {' - '}
                    </span>
                    <span className="header-id">{project.projectId}</span>
                </div>
                <Grid columns={2}>
                    <Grid.Column width={5} className="grid-component-left">
                        <Segment>
                            <EditStatus status={project.status} isStory={true}
                                        disabled={!hasAuth("updateProjectStatus", project.authCode)}
                                        changeStatus={(status, percent) => this.changeStatus(project, status, percent)}/>
                        </Segment>
                        <Segment className="component-detail">
                            <Tab menu={{secondary: true, pointing: true}} panes={panes}
                                 onTabChange={(event, data) => {
                                     this.setState({
                                         activeTab: data.activeIndex
                                     })
                                 }}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-right">
                        <Grid columns={2} className="grid-right-top">
                            <Grid.Column width={11} className="grid-right-top-left">
                                <Segment padded className="e-charts-segment">
                                    <EfficiencyDiagram/>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={5} className="grid-right-top-right">
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
                        </Grid>
                        <Grid.Row className="grid-right-bottom">
                            <Segment>
                                <Requirement/>
                            </Segment>
                            <Segment>
                                {hasAuth("MVPDashBoard", project.authCode) ?
                                    <Link style={{border: '1px solid #1b1c1d'}} className="create-requirement-button"
                                          to={`/home/MVPDashboard/${project.projectId}`}>
                                        MVP Dashboard
                                    </Link> : null}
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
