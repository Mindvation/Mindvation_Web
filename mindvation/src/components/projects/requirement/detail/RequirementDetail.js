import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
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
                            <EditBasicInfo requirement={requirement} dispatch={dispatch}
                                           disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
                            <EditAdditionalInfo requirement={requirement} dispatch={dispatch}
                                                disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
                            <EditOptionalInfo requirement={requirement} dispatch={dispatch}
                                              disabled={!hasAuth("updateRequirement", requirement.authCode)}/>
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
