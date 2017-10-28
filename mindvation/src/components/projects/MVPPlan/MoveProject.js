import React, {Component} from 'react';
import DropContainer from '../../common/DropContainer';
import Box from '../../common/DragBox';
import {Grid, List, Segment, Header, Icon, Dropdown, Modal, Button} from 'semantic-ui-react';
import {priorityOptions} from '../../../res/data/dataOptions';
import {getDesc, checkCompleted} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import SelectCycle from './SelectCycle';
import CompleteSprint from './CompleteSprint';

let mandatoryFile = ["iterationCycle"];

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
        status: 'done',
        stories: [],
        points: 0
    }, {
        key: 'next',
        text: 'Next Sprint',
        status: 'inProgress',
        stories: [],
        points: 0
    },
];

class MoveProject extends Component {
    state = {
        sprints: sprints,
        cycleOpen: false,
        completeOpen: false
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

    checkDetail = (event, storyId) => {
        event.stopPropagation();
        const {storyDetail} = this.props;
        storyDetail && storyDetail(storyId);
    };

    startSprint = (sprint) => {
        this.setState({
            cycleOpen: true
        })
    };

    closeSprint = (sprint) => {
        this.setState({
            completeOpen: true
        })
    };

    closeCycleModal = () => {
        let timer = setTimeout(() => {
            this.setState({cycleOpen: false});
            timer && clearTimeout(timer);
        }, 0);
    };

    selectCycleInfo = () => {
        const cycleInfo = this.selectCycleNode.getInfo();
        let flag = checkCompleted(mandatoryFile, cycleInfo);
        if (flag) {
            this.closeCycleModal();
        }
    };

    closeCompleteModal = () => {
        this.setState({
            completeOpen: false
        })
    };

    completeSprint = () => {
        this.setState({
            completeOpen: false
        })
    };

    render() {
        const {sprints, cycleOpen, completeOpen} = this.state;
        return (
            <div>
                <Header as='h3'>
                    <Icon name='dashboard'/>
                    <Header.Content>
                        Dashboard
                    </Header.Content>
                </Header>
                <Grid columns={3} className="mvp-project-container">
                    {
                        sprints.map((sprint, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="mvp-sprint-container">
                                    <div className="mvp-sprint-title">
                                        <span className="mvp-sprint-title-text">{sprint.text}({sprint.points})</span>
                                        {sprint.key !== 'backlogs' ? <div className="mvp-sprint-status">
                                            {sprint.status === 'inProgress' ?
                                                <Icon name='video play outline' size="large" color="green"/> : null}
                                            {sprint.status === 'inProgress' ?
                                                <Icon name='recycle' size="large" color="blue"/> : null}
                                            <Icon name='warning sign' size="large" color="orange"/>
                                            {sprint.status === 'done' ?
                                                <Icon name='stop circle outline' size="large"/> : null}
                                        </div> : null}
                                        {sprint.key !== 'backlogs' ? <div className="mvp-sprint-action">
                                            <Dropdown>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item text='Start Sprint' onClick={() => {
                                                        this.startSprint(sprint)
                                                    }}/>
                                                    <Dropdown.Item text='Close Sprint' onClick={() => {
                                                        this.closeSprint(sprint)
                                                    }}/>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> : null}
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
                                                            <div
                                                                onClick={(event) => this.checkDetail(event, story.storyId)}
                                                                className="mvp-story-info">
                                                                <span className="mvp-story-id">{story.storyId}</span>
                                                                <span
                                                                    className="mvp-story-desc">{story.description}</span>
                                                                <span className="mvp-story-priority">
                                                                    {getDesc(priorityOptions, story.priority)}
                                                                </span>
                                                                <span
                                                                    className="mvp-story-point">{story.storyPoints}</span>
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
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={cycleOpen}
                    size='small'>
                    <SelectCycle ref={node => this.selectCycleNode = node}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeCycleModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.selectCycleInfo()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={completeOpen}
                    size='small'>
                    <CompleteSprint/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeCompleteModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.completeSprint()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default MoveProject;