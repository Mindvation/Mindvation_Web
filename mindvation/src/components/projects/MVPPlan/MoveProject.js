import React, {Component} from 'react';
import DropContainer from '../../common/DropContainer';
import Box from '../../common/DragBox';
import {Grid, Icon, Dropdown, Modal, Button} from 'semantic-ui-react';
import {priorityOptions, iterationCycleOptions} from '../../../res/data/dataOptions';
import {getDesc, checkValid, getDataInfo, parseNumber} from '../../../util/CommUtil';
import {getStaffId} from '../../../util/UserStore';
import {FormattedMessage} from 'react-intl';
import SelectCycle from './SelectCycle';
import CompleteSprint from './CompleteSprint';
import {updateDashboard, startIteration, closeIteration} from '../../../util/Service';
import Image from '../../common/Image';
import {hasAuth} from '../../../util/AuthUtil';
import {Progress} from 'antd';

class MoveProject extends Component {
    state = {
        sprints: [],
        cycleOpen: false,
        completeOpen: false,
        model: {},
        activeSprint: 1,
        isMoved: false,
        authCode: []
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
                    key: sprint.sprintInfo.name,
                    text: sprint.sprintInfo.name,
                    stories: [],
                    labels: sprint.labelIds || [],
                    status: sprint.sprintInfo.status,
                    iterationCycle: sprint.sprintInfo.iterationCycle,
                    points: 0
                };
                if (sprint.sprintInfo.status === "close") {
                    activeSprint = i + 1;
                }
                if (sprint.stories && sprint.stories.length > 0) {
                    sprint.stories.map((story) => {
                        story.story.functionLabelId = story.labelId;
                        story.story.isMoveable = story.isRemove;
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
            activeSprint: activeSprint,
            authCode: storyList.staffAuthInfo
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
            isMoved: true,
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
        let cycleInfo = this.selectCycleNode.getInfo();
        let flag = checkValid(cycleInfo);
        if (flag) {
            cycleInfo = getDataInfo(cycleInfo);
            startIteration({
                projId: this.props.projectId,
                creatorId: getStaffId(),
                modelId: this.state.model.modelId,
                name: this.handleSprint.key,
                iterationCycle: cycleInfo.iterationCycle
            }, (iterationInfo) => this.updateSprintStatus(iterationInfo));
        }
    };

    closeCompleteModal = () => {
        this.setState({
            completeOpen: false
        })
    };

    completeSprint = () => {
        let iterationInfo = this.completeSprintNode.getInfo();
        let flag = checkValid(iterationInfo);
        if (flag) {
            iterationInfo = getDataInfo(iterationInfo);
            closeIteration({
                projId: this.props.projectId,
                creatorId: getStaffId(),
                modelId: this.state.model.modelId,
                beforeName: this.handleSprint.key,
                afterName: iterationInfo.moveToSprint,
                stories: iterationInfo.movedStories
            }, (storyList) => {
                this.formatSprintsData(storyList);
                this.closeCompleteModal();
            });
        }
    };

    updateSprintStatus = (iterationInfo) => {
        this.handleSprint.status = iterationInfo.status;
        this.handleSprint.iterationCycle = iterationInfo.iterationCycle;
        this.setState({
            sprints: this.state.sprints
        });
        this.closeCycleModal();
    };

    AIArrangement = () => {
        let tempSprints = this.state.sprints;
        let allStories = [];
        let allLabels = [];
        tempSprints.map((item) => {
            if (item.text === 'Product Backlogs') {
                if (item.stories && item.stories.length > 0) {
                    item.stories.map((story) => {
                        if (story.isMoveable) {
                            allStories.push(story);
                            item.stories.splice(item.stories.indexOf(story), 1);
                            item.points -= Number(story.storyPoint)
                        }
                    })
                }
            }

            if (item.labels && item.labels.length > 0) {
                allLabels = allLabels.concat(item.labels);
            }
        });

        if (allStories.length === 0) return;
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
        });

        this.setState({
            isMoved: true,
            sprints: tempSprints
        })
    };

    confirmArrangement = () => {
        const {sprints, model} = this.state;
        const params = {
            projId: this.props.projectId,
            creatorId: getStaffId(),
            modelId: model.modelId,
            sprintAndStoryArrays: []
        };

        if (sprints && sprints.length > 0) {
            sprints.map((sprint) => {
                let tempSprint = {
                    name: sprint.key,
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

        updateDashboard(params, () => this.setState({
            isMoved: false
        }));
    };

    getStoryBox = (sprint, story) => {
        return <div className="mvp-story-AcceptBox">
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
                {sprint.status === "start" ? <div className="mvp-story-progress">
                    {story.progress === 100 ? null : <div className="plan-progress">
                        <div className="display-flex">
                            <div className="plan-progress-outer">
                                <div className="plan-progress-inner"
                                     style={{marginLeft: story.expectProgress + '%'}}>
                                    <div className="plan-progress-scale">
                                        <div
                                            className={"rag-text-color-" + story.ragStatus}>{story.expectProgress + '%'}</div>
                                        <Image
                                            name={"arrow-" + (story.ragStatus || 'G')}
                                            style={{marginRight: 0}}/>
                                    </div>
                                </div>
                            </div>
                            <span
                                className="plan-progress-text">{story.progress + '%'}</span>
                        </div>
                    </div>}
                    <Progress percent={story.progress} type={"line"}/>
                </div> : null}
            </div>
        </div>
    };

    render() {
        const {sprints, cycleOpen, completeOpen, model, activeSprint, isMoved, authCode} = this.state;
        return (
            <div className="model-main-container mvp-dashboard">
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
                                    <span
                                        className="mvp-sprint-title-text">{sprint.text}({parseNumber(sprint.points)})</span>
                                    {sprint.text !== 'Product Backlogs' ? <div className="mvp-sprint-status">
                                        {/*{sprint.status === 'start' ?
                                            <Icon name='video play outline' size="large" color="green"/> : null}*/}
                                        {sprint.status === 'start' ?
                                            <div className="display-flex mvp-cycle-text">
                                                <Image name="recycle"/>
                                                {getDesc(iterationCycleOptions, sprint.iterationCycle)}
                                            </div> : null}
                                        {/*{sprint.status === 'warning' ?
                                            <Icon name='warning sign' size="large" color="orange"/> : null}*/}
                                        {sprint.status === 'close' ?
                                            <Icon name='stop circle outline' size="large"/> : null}
                                    </div> : null}
                                    {hasAuth("MVPDashBoard", authCode) && activeSprint === i && !isMoved ?
                                        <div className="mvp-sprint-action">
                                            <Dropdown>
                                                <Dropdown.Menu>
                                                    {sprint.status === 'notStart' ?
                                                        <Dropdown.Item text={
                                                            <FormattedMessage
                                                                id="startSprint"
                                                                defaultValue="Start Sprint"
                                                            />
                                                        } onClick={() => {
                                                            this.startSprint(sprint)
                                                        }}/> : null}
                                                    {sprint.status === 'start' ?
                                                        <Dropdown.Item text={
                                                            <FormattedMessage
                                                                id="closeSprint"
                                                                defaultValue="Close Sprint"
                                                            />
                                                        } onClick={() => {
                                                            this.closeSprint(sprint)
                                                        }}/> : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> : null}
                                </div>
                                <DropContainer data={sprint.key}>
                                    {
                                        sprint.stories.map((story, i) => {
                                            return story.isMoveable ? <div className="mvp-story-AcceptBox" key={i}>
                                                <Box
                                                    data={{
                                                        'story': story,
                                                        'lastSprint': sprint.key
                                                    }}
                                                    action={(handleData, sprint) => this.moveProjectToNext(handleData, sprint)}>
                                                    {this.getStoryBox(sprint, story)}
                                                </Box>
                                            </div> : <div className="unmovable-dashboard" key={i}>
                                                {this.getStoryBox(sprint, story)}
                                            </div>
                                        })
                                    }
                                </DropContainer>
                            </Grid.Column>
                        })
                    }
                </Grid>

                {hasAuth("MVPDashBoard", authCode) ? <div className="mvp-arrange">
                    <Button className="confirm-button" onClick={() => this.AIArrangement()}>
                        <FormattedMessage
                            id='AIArrangement'
                            defaultMessage='AI Arrangement'
                        />
                    </Button>
                    <Button
                        disabled={!isMoved}
                        className="confirm-button"
                        style={{marginLeft: '20px'}}
                        onClick={() => this.confirmArrangement()}>
                        <FormattedMessage
                            id='confirmCurrentArrangement'
                            defaultMessage='Confirm Current Arrangement'
                        />
                    </Button>
                </div> : null}

                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={cycleOpen}
                    size='small'>
                    <Modal.Header className="modal-title-border">
                        <Image name="choose"/>
                        <FormattedMessage
                            id='chooseIterationCycle'
                            defaultMessage='Choose Iteration Cycle'
                        />
                    </Modal.Header>
                    <SelectCycle ref={node => this.selectCycleNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeCycleModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.selectCycleInfo()}>
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
                    <Modal.Header className="modal-title-border">
                        <Image name="endMVP"/>
                        {this.handleSprint ? this.handleSprint.text : ''}
                    </Modal.Header>
                    <CompleteSprint handleSprint={this.handleSprint}
                                    mvpInfo={
                                        {
                                            projId: this.props.projectId,
                                            creatorId: getStaffId(),
                                            modelId: model.modelId
                                        }
                                    }
                                    ref={node => this.completeSprintNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeCompleteModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.completeSprint()}>
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