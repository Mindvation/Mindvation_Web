import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import EditBasicInfo from './EditBasicInfo';
import {FormattedMessage} from 'react-intl';
import {getProjectById} from '../../../actions/project_action';

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
                <Grid columns={3}>
                    <Grid.Column width={5}>
                        <div className="grid-component">
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
                            <Segment>
                                <EditBasicInfo project={project} dispatch={dispatch}/>
                            </Segment>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={7}>
                        <div style={{backgroundColor: 'green', height: '800px'}}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div style={{backgroundColor: 'red', height: '800px'}}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default ProjectDetail;
