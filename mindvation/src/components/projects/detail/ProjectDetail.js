import React, {Component} from 'react';
import {Grid, Segment, Tab, Menu} from 'semantic-ui-react';
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
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

class ProjectDetail extends Component {
    state = {activeTab: 0, reqActiveTab: "requirements"};

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getProjectById(id));
    };

    componentWillReceiveProps(nextProps) {
        const {id} = nextProps.match.params;
        if (id !== this.props.match.params.id) {
            this.props.dispatch(getProjectById(id));
        }
    }

    changeStatus = (project, status, percent = 0) => {
        const statusInfo = {
            projectId: project.projectId,
            status,
            percent
        };
        this.props.dispatch(updateProjectStatus(statusInfo));
    };

    render() {
        const {project, dispatch} = this.props;
        const {activeTab, reqActiveTab} = this.state;
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
                pane: <Tab.Pane key="edit-basicInfo" attached={false}>
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
                pane: <Tab.Pane attached={false} key="edit-additionalInfo">
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
                pane: <Tab.Pane attached={false} key="edit-optionalItems">
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
                                 renderActiveOnly={false}
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
                            <Tabs type="card" className="requirement-tab" onChange={(key) => {
                                this.setState({
                                    reqActiveTab: key
                                })
                            }}>
                                <TabPane tab={
                                    <div className="detail-tab-title">
                                        <Image
                                            name={reqActiveTab === "requirements" ? "requirement_selected" : "requirement_unselected"}/>
                                        <FormattedMessage
                                            id='requirements'
                                            defaultMessage='Requirements'
                                        />
                                    </div>
                                } key="requirements">
                                    <Requirement projectId={this.props.match.params.id}/>
                                </TabPane>
                                <TabPane tab={
                                    <div className="detail-tab-title">
                                        <Image
                                            name={reqActiveTab === "dashboard" ? "dashboard_selected" : "dashboard_unselected"}/>
                                        <FormattedMessage
                                            id='dashboard'
                                            defaultMessage='Dashboard'
                                        />
                                    </div>
                                } key="dashboard" className="requirement-tab-menu">
                                    <div className="requirement-pane">
                                        <div className="tab-item-header">
                                            <FormattedMessage
                                                id='dashboard'
                                                defaultMessage='Dashboard'
                                            />
                                        </div>
                                        <div style={{marginTop: '20px'}}>
                                            {/*{hasAuth("MVPDashBoard", project.authCode) ?
                                                <Link className="link-mvp-button"
                                                      to={`/home/MVPDashboard/${project.projectId}`}>
                                                    MVP Dashboard
                                                </Link> : null}*/}
                                            <Link className="link-mvp-button"
                                                  to={`/home/MVPDashboard/${project.projectId}`}>
                                                MVP Dashboard
                                            </Link>
                                            <Link className="link-mvp-button"
                                                  to={`/home/MyMVPDashboard/${project.projectId}`}>
                                                My MVP Dashboard
                                            </Link>
                                            {/*<Link className="link-mvp-button"
                                                  to={`/home/AllDashboard/${project.projectId}`}>
                                                Dashboard
                                            </Link>*/}
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default ProjectDetail;
