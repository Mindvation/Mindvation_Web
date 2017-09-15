import React, {Component} from 'react';
import DropContainer from '../../common/DropContainer';
import Box from '../../common/DragBox';
import {Grid, List, Segment} from 'semantic-ui-react';
import {priorityOptions} from '../../../res/data/dummyData';
import {getDesc} from '../../../util/CommUtil';

const testProjects = [{
    storyId: 'S0001',
    description: 'We need make a B2B project which can help company to solve teamwork',
    priority: 'H',
    storyPoints: '1'
}, {
    storyId: 'S0002',
    description: 'We need make a B2B project which can help company to solve teamwork',
    priority: 'M',
    storyPoints: '2'
}, {
    storyId: 'S0003',
    description: 'We need make a B2B project which can help company to solve teamwork',
    priority: 'L',
    storyPoints: '3'
}, {
    storyId: 'S0004',
    description: 'We need make a B2B project which can help company to solve teamwork',
    priority: 'H',
    storyPoints: '5'
}, {
    storyId: 'S0005',
    description: 'We need make a B2B project which can help company to solve teamwork',
    priority: 'H',
    storyPoints: '2.5'
}];

const sprints = [
    {
        key: 'backlogs',
        text: 'Product Backlogs',
        stories: [],
        points: 0
    }, {
        key: 'current',
        text: 'Current Sprint',
        stories: [],
        points: 0
    }, {
        key: 'next',
        text: 'Next Sprint',
        stories: [],
        points: 0
    },
];

class MoveProject extends Component {
    state = {
        sprints: sprints
    };

    componentWillMount() {
        let tempSprints = this.state.sprints;
        tempSprints.map((sprint) => {
            if (sprint.key === 'backlogs') {
                sprint.stories = [];
                sprint.points = 0;
                testProjects.map((testPro) => {
                    sprint.stories.push(testPro);
                    sprint.points += Number(testPro.storyPoints)
                });
            } else {
                sprint.stories = [];
                sprint.points = 0
            }
        });
        this.setState({
            sprints: tempSprints
        })
    }

    moveProjectToNext = (story, sprint) => {
        if (story.lastSprint === sprint.name) return;
        let tempSprints = this.state.sprints;
        tempSprints.map((item) => {
            if (item.key === sprint.name) {
                item.stories.push(story.story);
                item.points += Number(story.story.storyPoints)
            }
            if (item.key === story.lastSprint) {
                item.stories.splice(item.stories.indexOf(story.story), 1);
                item.points -= Number(story.story.storyPoints)
            }
        });
        this.setState({
            sprints: tempSprints
        })
    };

    render() {
        const {sprints} = this.state;
        return (
            <Grid columns={3} className="mvp-project-container">
                {
                    sprints.map((sprint, i) => {
                        return <Grid.Column key={i}>
                            <Segment className="mvp-sprint-container">
                                <div className="mvp-sprint-title">
                                    <span className="mvp-sprint-title-text">{sprint.text}({sprint.points})</span>
                                </div>
                                <DropContainer data={sprint.key}>
                                    <List divided>
                                        {
                                            sprint.stories.map((story, i) => {
                                                return <List.Item className="mvp-project-box" key={i}>
                                                    <Box
                                                        data={{
                                                            'story': story,
                                                            'lastSprint': sprint.key
                                                        }}
                                                        action={(handleData, sprint) => this.moveProjectToNext(handleData, sprint)}>
                                                        <div className="mvp-story-info">
                                                            <span className="mvp-story-id">{story.storyId}</span>
                                                            <span className="mvp-story-desc">{story.description}</span>
                                                            <span className="mvp-story-priority">
                                                                {getDesc(priorityOptions, story.priority)}
                                                            </span>
                                                            <span className="mvp-story-point">{story.storyPoints}</span>
                                                        </div>
                                                    </Box>
                                                </List.Item>
                                            })
                                        }
                                    </List>
                                </DropContainer>
                            </Segment>
                        </Grid.Column>
                    })
                }
            </Grid>
        );
    }
}

export default MoveProject;