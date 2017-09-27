import React, {Component} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getStoryById} from '../../../../actions/story_action';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import UploadAttach from '../UploadAttach';
import {
    Link
} from 'react-router-dom';

class StoryDetail extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getStoryById(id));
    };

    render() {
        const {story, dispatch} = this.props;
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
                            <Link to={`/home/projects/${story.projectId}`}>
                                {story.projectId}
                            </Link>
                        </span>
                        {'>'}
                        <span className={"underLine header-id"}>
                            <Link to={`/home/requirement/${story.reqId}`}>
                                {story.reqId}
                            </Link>
                        </span>
                        {'>'}
                        <span className={"underLine header-id"}>{story.storyId}</span>
                    </Header.Content>
                </Header>
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment padded>
                            <EditBasicInfo story={story} dispatch={dispatch}/>
                            <EditAdditionalInfo story={story} dispatch={dispatch}/>
                            <EditOptionalInfo story={story} dispatch={dispatch}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-right">
                        <Segment>
                            <UploadAttach story={story} dispatch={dispatch}/>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default StoryDetail;
