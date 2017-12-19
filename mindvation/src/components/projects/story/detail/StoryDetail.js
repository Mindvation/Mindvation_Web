import React, {Component} from 'react';
import {Grid, Segment, Tab, Menu} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getStoryById, updateStoryStatus, clearStory} from '../../../../actions/story_action';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import StoryRemark from './StoryRemark';
import TaskList from '../TaskList';
import AddTask from '../AddTask';
import {
    Link
} from 'react-router-dom';
import {hasAuth} from '../../../../util/AuthUtil';
import EditStatus from "../../EditStatus";
import Image from '../../../common/Image';
import Discussion from './Discussion';
import Reward from '../../../reward/Reward';

class StoryDetail extends Component {
    state = {activeTab: 0, activeTab2: 0};

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getStoryById(id));
    };

    componentWillReceiveProps(nextProps) {
        const {id} = nextProps.match.params;
        if (id !== this.props.match.params.id) {
            this.props.dispatch(clearStory());
            this.props.dispatch(getStoryById(id));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearStory());
    }

    changeStatus = (story, status, percent = 0) => {
        /*Object.assign(story.status, {
            status,
            percent
        });
        this.props.dispatch(updateStory(story));*/
        const statusInfo = {
            storyId: this.props.story.storyId,
            status,
            percent
        };
        this.props.dispatch(updateStoryStatus(statusInfo));
    };

    render() {
        const {story, dispatch} = this.props;
        const {activeTab, activeTab2} = this.state;
        const panes = [
            {
                menuItem: <Menu.Item key="basicInfo">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 0 ? "basic_selected" : "basic_unselected"}/>
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="edit-basicInfo">
                    <EditBasicInfo story={story} dispatch={dispatch}
                                   disabled={!hasAuth("updateStory", story.authCode)}/>
                </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="additionalInfo">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 1 ? "additional_selected" : "additional_unselected"}/>
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='additional Info'
                        />
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="edit-additionalInfo">
                    <EditAdditionalInfo story={story} dispatch={dispatch}
                                        disabled={!hasAuth("updateStory", story.authCode)}/>
                </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="optionalItems">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 2 ? "optional_selected" : "optional_unselected"}/>
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="edit-optionalItems">
                    <EditOptionalInfo story={story} dispatch={dispatch}
                                      disabled={!hasAuth("updateStory", story.authCode)}/>
                </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="remarks">
                    <div className="detail-tab-title">
                        <Image name={activeTab === 3 ? "minute_selected" : "minute_unselected"}/>
                        <FormattedMessage
                            id='minuteInfo'
                            defaultMessage='Minute'
                        />
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="edit-remarks">
                    <StoryRemark story={story} dispatch={dispatch}
                                 disabled={!hasAuth("updateStory", story.authCode)}/>
                </Tab.Pane>
            }
        ];

        const panes2 = [
            {
                menuItem: <Menu.Item key="discussion">
                    <div className="detail-tab-title">
                        <Image name={activeTab2 === 0 ? "comment" : "comment_unselected"}/>
                        <FormattedMessage
                            id='comment'
                            defaultMessage='Comment'
                        />
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="check-discussion">
                    <Discussion story={story} dispatch={dispatch}/>
                </Tab.Pane>
            },
            {
                menuItem: <Menu.Item key="reward">
                    <div className="detail-tab-title">
                        <Image name={activeTab2 === 1 ? "knowledge_selected" : "knowledge_unselected"}/>
                        求助
                    </div>
                </Menu.Item>,
                pane: <Tab.Pane attached={false} key="check-reward">
                    <Reward active={activeTab2 === 1}/>
                </Tab.Pane>
            }
        ];

        return (
            <div className="project-detail">
                <div className="header-project">
                    <span className="header-project-text">
                        <FormattedMessage
                            id='projectsUpper'
                            defaultMessage='PROJECTS'
                        />
                        {' - '}
                    </span>
                    <span className="header-link">
                        <Link to={`/home/projects/${story.projectId}`}>
                            {story.projectId}
                        </Link>
                    </span>
                    <span className="header-project-text">
                        {' - '}
                    </span>
                    <span className="header-link">
                        <Link to={`/home/requirement/${story.reqId}`}>
                            {story.reqId}
                        </Link>
                    </span>
                    <span className="header-project-text">
                        {' - '}
                    </span>
                    <span className="header-id">{story.storyId}</span>
                </div>
                <Grid columns={2}>
                    <Grid.Column width={5} className="grid-component-left">
                        <Segment>
                            <EditStatus status={story.status}
                                        disabled={!hasAuth("updateStoryStatus", story.authCode)}
                                        changeStatus={(status, percent) => this.changeStatus(story, status, percent)}/>
                        </Segment>
                        <Segment className="component-detail">
                            <Tab menu={{secondary: true, pointing: true}} panes={panes}
                                 onTabChange={(event, data) => {
                                     this.setState({
                                         activeTab: data.activeIndex
                                     })
                                 }}
                                 renderActiveOnly={false}
                            />
                        </Segment>
                        {/*<div className="comment-component">
                            <Discussion story={story} dispatch={dispatch}/>
                        </div>*/}
                        <Segment className="component-detail">
                            <Tab menu={{secondary: true, pointing: true}} panes={panes2}
                                 onTabChange={(event, data) => {
                                     this.setState({
                                         activeTab2: data.activeIndex
                                     })
                                 }}
                                 renderActiveOnly={false}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-task">
                        <TaskList story={story} dispatch={dispatch}/>
                        {hasAuth("createTask", story.authCode) ? <AddTask dispatch={dispatch} story={story}/> : null}
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default StoryDetail;
