import React, {Component} from 'react';
import {Grid, Header, Segment, Tab, Menu, Icon} from 'semantic-ui-react';
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

class RequirementDetail extends Component {

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
        const panes = [
            {
                menuItem: <Menu.Item key="basicInfo">
                    <div className="detail-tab-title">
                        <Icon name="browser"/>
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditBasicInfo requirement={requirement} dispatch={dispatch}
                                       disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
                    </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="additionalInfo">
                    <div className="detail-tab-title">
                        <Icon name="browser"/>
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='additional Info'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditAdditionalInfo requirement={requirement} dispatch={dispatch}
                                            disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
                    </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="optionalItems">
                    <div className="detail-tab-title">
                        <Icon name="browser"/>
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </div>
                </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditOptionalInfo requirement={requirement} dispatch={dispatch}
                                          disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
                    </Tab.Pane>
            }
        ];

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
                        <span className={"underLine header-id"}>
                            <Link to={`/home/projects/${requirement.projectId}`}>
                                {requirement.projectId}
                            </Link>
                        </span>
                        {'>'}
                        <span className={"underLine header-id"}>{requirement.reqId}</span>
                    </Header.Content>
                </Header>
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment padded>
                            <EditStatus status={requirement.status}
                                        disabled={!hasAuth("updateRequirementStatus", requirement.authCode)}
                                        changeStatus={(status, percent) => this.changeStatus(requirement, status, percent)}/>
                        </Segment>
                        <Segment className="component-detail">
                            <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
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
