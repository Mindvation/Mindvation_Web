import React, {Component} from 'react';
import DropContainer from '../../common/DropContainer';
import Box from '../../common/DragBox';
import {Grid, List, Segment, Header, Icon, Dropdown, Modal, Button} from 'semantic-ui-react';
import {priorityOptions} from '../../../res/data/dataOptions';
import {getDesc, checkCompleted} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import SelectCycle from './SelectCycle';
import CompleteSprint from './CompleteSprint';
import {updateDashboard, startIteration, closeIteration} from '../../../util/Service';

let mandatoryFiled = ["iterationCycle"], iterationMandatoryFiled = ["moveToSprint"];

class MoveProject extends Component {
    state = {
        sprints: [],
        cycleOpen: false,
        completeOpen: false,
        model: {},
        activeSprint: 1
    };

    componentWillMount() {
        const {storyList} = this.props;
        this.formatSprintsData(storyList);
    }

    formatSprintsData(storyList) {
        let tempSprints = [];
        let activeSprint = 1;
        if (storyList.sprintStoryLists && storyList.sprintStoryLists.length > 0) {
            storyList.sprintStoryLists.map((sprint, i) => {
                let tempIteration = {
                    key: sprint.sprintInfo.uuId,
                    text: sprint.sprintInfo.name,
                    stories: [],
                    labels: sprint.labelIds || [],
                    status: sprint.sprintInfo.status,
                    points: 0
                };
                if (sprint.sprintInfo.status === "close") {
                    activeSprint = i + 1;
                }
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
            model: storyList.model,
            activeSprint: activeSprint
        })
    }

    moveProjectToNext = (story, sprint) => {
        if (story.lastSprint === sprint.name) return;
        let tempSprints = this.state.sprints;
        tempSprints.map((item) => {
            if (item.key === sprint.name) {
                item.stories.push(story.story);
                item.points += Number(story.story.storyPoint)
            }
            if (item.key === story.lastSprint) {
                item.stories.splice(item.stories.indexOf(story.story), 1);
                item.points -= Number(story.story.storyPoint)
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
        this.handleSprint = sprint;
        this.setState({
            cycleOpen: true
        })
    };

    closeSprint = (sprint) => {
        this.handleSprint = sprint;
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
        let flag = checkCompleted(mandatoryFiled, cycleInfo);
        if (flag) {
            startIteration({
                "uuId": this.handleSprint.key,
                "iterationCycle": cycleInfo.iterationCycle
            }, (iterationInfo) => this.updateSprintStatus(iterationInfo));
        }
    };

    closeCompleteModal = () => {
        this.setState({
            completeOpen: false
        })
    };

    completeSprint = () => {
        const iterationInfo = this.completeSprintNode.getInfo();
        let flag = checkCompleted(iterationMandatoryFiled, iterationInfo);
        if (flag) {
            closeIteration({
                "beforUuId": this.handleSprint.key,
                "afterUuId": iterationInfo.moveToSprint,
                "stories": iterationInfo.movedStories
            }, (storyList) => {
                this.formatSprintsData(storyList);
                this.closeCompleteModal();
            });
        }
    };

    updateSprintStatus = (iterationInfo) => {
        this.handleSprint.status = iterationInfo.status;
        this.setState({
            sprints: this.state.sprints
        });
        this.closeCycleModal();
    };

    AIArrangement = () => {
        const {sprints} = this.state;
        let tempSprints = [];
        let allStories = [];
        let allLabels = [];
        sprints.map((item) => {
            tempSprints.push({
                key: item.key,
                text: item.text,
                labels: item.labels,
                status: item.status,
                stories: [],
                points: 0
            });

            if (item.stories && item.stories.length > 0) {
                allStories = allStories.concat(item.stories);
            }

            if (item.labels && item.labels.length > 0) {
                allLabels = allLabels.concat(item.labels);
            }
        });

        if (allStories.length > 0) {
            allStories.map((story) => {
                if (allLabels.indexOf(story.functionLabelId) === -1) {
                    tempSprints[0].stories.push(story);
                    tempSprints[0].points += Number(story.storyPoint);
                } else {
                    tempSprints.some((item) => {
                        if (item.labels.indexOf(story.functionLabelId) > -1) {
                            item.stories.push(story);
                            item.points += Number(story.storyPoint);
                            return true;
                        }
                    })
                }
            })
        }

        this.setState({
            sprints: tempSprints
        })
    };

    confirmArrangement = () => {
        const {sprints, model} = this.state;
        const params = {
            modelId: model.modelId,
            sprintAndStoryArrays: []
        };

        if (sprints && sprints.length > 0) {
            sprints.map((sprint) => {
                let tempSprint = {
                    uuId: sprint.key,
                    stories: []
                };
                if (sprint.stories && sprint.stories.length > 0) {
                    sprint.stories.map((story) => {
                        tempSprint.stories.push(story.storyId)
                    })
                }
                params.sprintAndStoryArrays.push(tempSprint)
            })
        }

        updateDashboard(params);
    };

    render() {
        const {sprints, cycleOpen, completeOpen, model, activeSprint} = this.state;
        return (
            <div>
                <Header as='h3'>
                    <Icon name='dashboard'/>
                    <Header.Content>
                        Dashboard --- {model.name}
                    </Header.Content>
                </Header>
                <Grid columns={3} className="mvp-project-container">
                    {
                        sprints.map((sprint, i) => {
                            return <Grid.Column key={i}>
                                <Segment className="mvp-sprint-container">
                                    <div className="mvp-sprint-title">
                                        <span className="mvp-sprint-title-text">{sprint.text}({sprint.points})</span>
                                        {sprint.text !== 'Product Backlogs' ? <div className="mvp-sprint-status">
                                            {sprint.status === 'start' ?
                                                <Icon name='video play outline' size="large" color="green"/> : null}
                                            {sprint.status === 'start' ?
                                                <Icon name='recycle' size="large" color="blue"/> : null}
                                            {sprint.status === 'warning' ?
                                                <Icon name='warning sign' size="large" color="orange"/> : null}
                                            {sprint.status === 'close' ?
                                                <Icon name='stop circle outline' size="large"/> : null}
                                        </div> : null}
                                        {activeSprint === i ?
                                            <div className="mvp-sprint-action">
                                                <Dropdown>
                                                    <Dropdown.Menu>
                                                        {sprint.status === 'notStart' ?
                                                            <Dropdown.Item text='Start Sprint' onClick={() => {
                                                                this.startSprint(sprint)
                                                            }}/> : null}
                                                        {sprint.status === 'start' ?
                                                            <Dropdown.Item text='Close Sprint' onClick={() => {
                                                                this.closeSprint(sprint)
                                                            }}/> : null}
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
                                                                    className="mvp-story-point">{story.storyPoint}</span>
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
                <div style={{marginBottom: '2em', justifyContent: 'space-evenly', display: 'flex'}}>
                    <Button primary onClick={() => this.AIArrangement()}>
                        AI Arrangement
                    </Button>
                    <Button primary onClick={() => this.confirmArrangement()}>
                        <FormattedMessage
                            id='confirm'
                            defaultMessage='Confirm'
                        />
                    </Button>
                </div>

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
                    <CompleteSprint handleSprint={this.handleSprint}
                                    ref={node => this.completeSprintNode = node}/>
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