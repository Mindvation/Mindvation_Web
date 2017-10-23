import React, {Component} from 'react';
import AcceptContainer from '../../common/AcceptContainer';
import AcceptBox from '../../common/AcceptBox';
import {Grid, Header, Icon, List, Segment} from 'semantic-ui-react';
import {priorityOptions} from '../../../res/data/dataOptions';
import {getDesc} from '../../../util/CommUtil';
import _ from 'lodash';

const testProjects = [
    [{
        storyId: 'S0001',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '1',
        status: 'new',
        subStatus: 'normal'
    }, {
        storyId: 'S0002',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'M',
        storyPoints: '2',
        status: 'new',
        subStatus: 'normal'
    }, {
        storyId: 'S0003',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'L',
        storyPoints: '3',
        status: 'new',
        subStatus: 'warning'
    }, {
        storyId: 'S0004',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '5',
        status: 'inProgress',
        subStatus: 'delay'
    }, {
        storyId: 'S0005',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '2.5',
        status: 'done'
    }],
    [{
        storyId: 'S0006',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '1',
        status: 'done'
    }, {
        storyId: 'S0007',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'M',
        storyPoints: '2',
        status: 'inProgress',
        subStatus: 'normal'
    }, {
        storyId: 'S0008',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'L',
        storyPoints: '3',
        status: 'new',
        subStatus: 'warning'
    }, {
        storyId: 'S0009',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '5',
        status: 'inProgress',
        subStatus: 'delay'
    }, {
        storyId: 'S0010',
        description: 'We need make a B2B project which can help company to solve teamwork',
        priority: 'H',
        storyPoints: '2.5',
        status: 'done'
    }]
];

const statuses = [
    {
        key: 'new',
        text: 'To Do',
        stories: [],
        points: 0,
        accepts: []
    }, {
        key: 'inProgress',
        text: 'In Progress',
        stories: [],
        points: 0,
        accepts: ['new']
    }, {
        key: 'done',
        text: 'Done',
        stories: [],
        points: 0,
        accepts: ['inProgress']
    },
];

class MoveProject extends Component {
    state = {
        statuses: []
    };

    componentWillMount() {
        this.formatSprintData(this.props.sprint);
    }

    componentWillReceiveProps(nextProps) {
        const {sprint} = nextProps;
        if (sprint === this.props.sprint) return;
        this.formatSprintData(sprint);
    }

    formatSprintData = (sprint) => {
        let currSprint = sprint > 1 ? 1 : 0;
        let tempStatus = _.cloneDeep(statuses);
        let projects = _.cloneDeep(testProjects[currSprint]);
        projects.map((testPro) => {
            if (testPro.status === "new") {
                tempStatus[0].stories.push(testPro);
                tempStatus[0].points += Number(testPro.storyPoints);
            }
            if (testPro.status === "inProgress") {
                tempStatus[1].stories.push(testPro);
                tempStatus[1].points += Number(testPro.storyPoints);
            }
            if (testPro.status === "done") {
                tempStatus[2].stories.push(testPro);
                tempStatus[2].points += Number(testPro.storyPoints);
            }
        });

        this.setState({
            statuses: tempStatus
        })
    };

    moveProjectToNext = (story, status) => {
        if (story.lastStatus === status.key) return;
        let tempStatues = this.state.statuses;
        tempStatues.map((item) => {
            if (item.key === status.name) {
                story.story.status = item.key;
                item.stories.push(story.story);
                item.points += Number(story.story.storyPoints)
            }
            if (item.key === story.lastStatus) {
                item.stories.splice(item.stories.indexOf(story.story), 1);
                item.points -= Number(story.story.storyPoints)
            }
        });
        this.setState({
            statuses: tempStatues
        })
    };

    checkDetail = (event, storyId) => {
        event.stopPropagation();
        const {storyDetail} = this.props;
        storyDetail && storyDetail(storyId);
    };

    render() {
        const {statuses} = this.state;
        const {sprint} = this.props;
        return (
            <div className="components-item">
                <Header as='h3'>
                    <Icon name='plane'/>
                    <Header.Content>
                        Sprint {sprint}
                    </Header.Content>
                </Header>
                <Grid columns={3} className="mvp-project-container">
                    {
                        statuses.map((status, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="mvp-sprint-container">
                                    <div className="mvp-sprint-title">
                                        <span className="mvp-sprint-title-text">{status.text}({status.points})</span>
                                    </div>
                                    <AcceptContainer data={status.key} accepts={status.accepts}>
                                        <List divided>
                                            {
                                                status.stories.map((story, i) => {
                                                    return <List.Item
                                                        className={story.status === "inProgress" ? "mvp-project-AcceptBox story-in-progress " + "story-status-" + (story.subStatus ? story.subStatus : 'normal') : "mvp-project-AcceptBox"}
                                                        key={i}>
                                                        <AcceptBox
                                                            data={{
                                                                'story': story,
                                                                'lastStatus': status.key
                                                            }}
                                                            type={story.status}
                                                            action={(handleData, status) => this.moveProjectToNext(handleData, status)}>
                                                            <div className="mvp-story-info"
                                                                 onClick={(event) => this.checkDetail(event, story.storyId)}>
                                                                    <span
                                                                        className="mvp-story-id">{story.storyId}</span>
                                                                <span
                                                                    className="mvp-story-desc">{story.description}</span>
                                                                <span className="mvp-story-priority">
                                                                {getDesc(priorityOptions, story.priority)}
                                                                </span>
                                                                <span
                                                                    className="mvp-story-point">{story.storyPoints}</span>
                                                            </div>
                                                        </AcceptBox>
                                                    </List.Item>
                                                })
                                            }
                                        </List>
                                    </AcceptContainer>
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid>
            </div>
        );
    }
}

export default MoveProject;