import React, {Component} from 'react';
import {Grid, Header, Segment, Tab, Menu, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getStoryById, updateStoryStatus} from '../../../../actions/story_action';
import EditBasicInfo from './EditBasicInfo';
import EditAdditionalInfo from './EditAdditionalInfo';
import EditOptionalInfo from './EditOptionalInfo';
import UploadAttach from '../UploadAttach';
import AddTask from '../AddTask';
import {
    Link
} from 'react-router-dom';
import {hasAuth} from '../../../../util/AuthUtil';
import EditStatus from "../../EditStatus";
import Image from '../../../common/Image';

class StoryDetail extends Component {
    state = {activeTab: 0};

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getStoryById(id));
    };

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

        const {activeTab} = this.state;
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
                render: () =>
                    <Tab.Pane attached={false}>
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
                render: () =>
                    <Tab.Pane attached={false}>
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
                render: () =>
                    <Tab.Pane attached={false}>
                        <EditOptionalInfo story={story} dispatch={dispatch}
                                          disabled={!hasAuth("updateStory", story.authCode)}/>
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
                        <Link to={`/home/projects/${story.reqId}`}>
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
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} className="grid-component-right">
                        <Segment>
                            <UploadAttach story={story} dispatch={dispatch}/>
                        </Segment>
                        {hasAuth("createTask", story.authCode) ? <AddTask dispatch={dispatch} story={story}/> : null}
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default StoryDetail;
