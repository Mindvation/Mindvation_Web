import React, {Component} from 'react';
import {Grid, Header, Segment, Tab, Menu} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getRequirementById, updateRequirementStatus} from '../../../../actions/requirement_action';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import Story from '../../story/Story';
import EditStatus from "../../EditStatus";
import {hasAuth} from '../../../../util/AuthUtil';
import {
    Link
} from 'react-router-dom';
import Image from '../../../common/Image';

class RequirementDetail extends Component {
    state = {activeTab: 0};

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getRequirementById(id));
    };

    changeStatus = (requirement, status, percent = 0) => {
        /* Object.assign(requirement.status, {
             status,
             percent
         });
         this.props.dispatch(updateRequirement(requirement));*/
        const statusInfo = {
            reqId: requirement.reqId,
            projectId: requirement.projectId,
            status,
            percent
        };
        this.props.dispatch(updateRequirementStatus(statusInfo));
    };

    render() {
        const {requirement, dispatch} = this.props;
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
                pane: <Tab.Pane attached={false} key="edit-basicInfo">
                    <EditBasicInfo requirement={requirement} dispatch={dispatch}
                                   disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
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
                    <EditAdditionalInfo requirement={requirement} dispatch={dispatch}
                                        disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
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
                    <EditOptionalInfo requirement={requirement} dispatch={dispatch}
                                      disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
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
                    <span className="header-link">
                        <Link to={`/home/projects/${requirement.projectId}`}>
                            {requirement.projectId}
                        </Link>
                    </span>
                    <span className="header-project-text">
                        {' - '}
                    </span>
                    <span className="header-id">{requirement.reqId}</span>
                </div>
                <Grid columns={2}>
                    <Grid.Column width={5} className="grid-component-left">
                        <Segment padded>
                            <EditStatus status={requirement.status}
                                        disabled={!hasAuth("updateRequirementStatus", requirement.authCode)}
                                        changeStatus={(status, percent) => this.changeStatus(requirement, status, percent)}/>
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
                        <Segment>
                            <Story/>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default RequirementDetail;
