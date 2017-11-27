import React, {Component} from 'react';
import {Grid, Icon} from 'semantic-ui-react';
import {priorityOptions, iterationCycleOptions} from '../../../res/data/dataOptions';
import {getDesc} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';

class MoveProject extends Component {
    state = {
        sprints: [],
        model: {}
    };

    componentWillMount() {
        const {storyList} = this.props;
        this.formatSprintsData(storyList);
    }

    formatSprintsData(storyList) {
        let tempSprints = [];
        if (storyList.sprintStoryLists && storyList.sprintStoryLists.length > 0) {
            storyList.sprintStoryLists.map((sprint, i) => {
                let tempIteration = {
                    key: sprint.sprintInfo.uuId,
                    text: sprint.sprintInfo.name,
                    stories: [],
                    labels: sprint.labelIds || [],
                    status: sprint.sprintInfo.status,
                    iterationCycle: sprint.sprintInfo.iterationCycle,
                    points: 0
                };
                if (sprint.stories && sprint.stories.length > 0) {
                    sprint.stories.map((story) => {
                        story.story.functionLabelId = story.labelId;
                        tempIteration.stories.push(story.story);
                        tempIteration.points += Number(story.story.storyPoint)
                    })
                }
                tempSprints.push(tempIteration);
            })
        }

        this.setState({
            sprints: tempSprints,
            model: storyList.model
        })
    }

    checkDetail = (event, storyId) => {
        event.stopPropagation();
        const {storyDetail} = this.props;
        storyDetail && storyDetail(storyId);
    };


    render() {
        const {sprints, model} = this.state;
        return (
            <div className="model-main-container all-dashboard mvp-dashboard">
                <div className="project-header">
                    <Image name='MVPDashboard'/>
                    <FormattedMessage
                        id='dashboard'
                        defaultMessage='Dashboard'
                    />
                    <span> --- {model.name}</span>
                </div>
                <Grid columns={3} className="mvp-grid-column">
                    {
                        sprints.map((sprint, i) => {
                            return <Grid.Column key={i}>
                                <div className="mvp-sprint-title">
                                    <span className="mvp-sprint-title-text">{sprint.text}({sprint.points})</span>
                                    {sprint.text !== 'Product Backlogs' ? <div className="mvp-sprint-status">
                                        {sprint.status === 'start' ?
                                            <div className="display-flex mvp-cycle-text">
                                                <Image name="recycle"/>
                                                {getDesc(iterationCycleOptions, sprint.iterationCycle)}
                                            </div> : null}
                                        {sprint.status === 'close' ?
                                            <Icon name='stop circle outline' size="large"/> : null}
                                    </div> : null}
                                </div>
                                <div data={sprint.key}>
                                    {
                                        sprint.stories.map((story, i) => {
                                            return <div className="mvp-story-AcceptBox" key={i}>
                                                <div
                                                    onClick={(event) => this.checkDetail(event, story.storyId)}
                                                    className="mvp-story-info">
                                                    <div className="mvp-story-id display-flex"
                                                         style={{justifyContent: "space-between"}}>
                                                        <div>
                                                            <Image
                                                                name={story.priority ? "priority_" + story.priority : "priority_1"}/>
                                                            {story.storyId}
                                                        </div>
                                                        <div className="display-flex">
                                                            <div className="mvp-story-priority">
                                                                {getDesc(priorityOptions, story.priority)}
                                                            </div>
                                                            <div
                                                                className="mvp-story-point">{story.storyPoint}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mvp-story-desc read-only-text">
                                                        <div className="simditor">
                                                            <div className="simditor-body"
                                                                 dangerouslySetInnerHTML={{__html: story.description}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </Grid.Column>
                        })
                    }
                </Grid>
            </div>
        );
    }
}

export default MoveProject;