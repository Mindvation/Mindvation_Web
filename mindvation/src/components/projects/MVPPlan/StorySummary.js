import React, {Component} from 'react';
import {Header, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getStoryById} from '../../../actions/story_action';
import EditBasicInfo from '../story/detail/EditBasicInfo';
import EditAdditionalInfo from '../story/detail/EditAdditionalInfo';
import EditOptionalInfo from '../story/detail/EditOptionalInfo';
import {
    withRouter
} from 'react-router-dom';

class StorySummary extends Component {

    componentDidMount() {
        const {storyId} = this.props;
        if (!storyId) return;
        this.props.dispatch(getStoryById(storyId));
    };

    componentWillReceiveProps(nextProps) {
        const {storyId} = nextProps;
        if (storyId === this.props.storyId) return;
        this.props.dispatch(getStoryById(storyId));
    }

    goToStoryDetail = (storyId) => {
        this.props.history.push(`/home/story/${storyId}`)
    };

    render() {
        const {story, dispatch, linkToStory = true} = this.props;
        return (
            <div className="project-detail story-summary">
                <Header as='h4'>
                    <Header.Content>
                        <span className={"underLine summary-id"}>{story.storyId}</span>
                    </Header.Content>
                </Header>
                {linkToStory ? <Button className="summary-link" onClick={(() => this.goToStoryDetail(story.storyId))}>
                    Go to Workflow</Button> : null}
                <EditBasicInfo readOnly={true} story={story} dispatch={dispatch}/>
                <EditAdditionalInfo readOnly={true} story={story} dispatch={dispatch}/>
                <EditOptionalInfo readOnly={true} story={story} dispatch={dispatch}/>
            </div>
        );
    }
}

export default withRouter(StorySummary);
