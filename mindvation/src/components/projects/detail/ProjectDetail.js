import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import {FormattedMessage} from 'react-intl';
import {getProjectById} from '../../../actions/project_action';
import EfficiencyDiagram from './EfficiencyDiagram';
import BurndownChart from './BurndownChart';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getProjectById(id));
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
                            <EditBasicInfo project={project} dispatch={dispatch}/>
                            <EditAdditionalInfo project={project} dispatch={dispatch}/>
                            <EditOptionalInfo project={project} dispatch={dispatch}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-right">
                        <Grid columns={2}>
                            <Grid.Column width={11}>
                                <Segment padded className="e-charts-segment">
                                    <EfficiencyDiagram/>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={5} className="grid-component-right">
                                <Segment padded className="e-charts-segment-small">
                                    <BurndownChart/>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <Grid.Row>
                            <div style={{backgroundColor: 'green', height: '800px'}}/>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default ProjectDetail;
