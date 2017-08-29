import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import EditBasicInfo from './EditBasicInfo';
import {FormattedMessage} from 'react-intl';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id} = this.props.match.params;
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
                                    <span className={"underLine header-id"}>{id}</span>
                                </Header.Content>
                            </Header>
                            <Segment>
                                <EditBasicInfo/>
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
