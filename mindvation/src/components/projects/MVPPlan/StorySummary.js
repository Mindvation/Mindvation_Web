import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Tab, Menu} from 'semantic-ui-react';
import {getStoryById} from '../../../actions/story_action';
import EditBasicInfo from '../story/detail/EditBasicInfo';
import EditAdditionalInfo from '../story/detail/EditAdditionalInfo';
import EditOptionalInfo from '../story/detail/EditOptionalInfo';
import Image from '../../common/Image';

class StorySummary extends Component {
    state = {activeTab: 0};

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
                                       disabled={true}/>
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
                                            disabled={true}/>
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
                                          disabled={true}/>
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <div className="summary-id">
                    {story.storyId}
                </div>
                {linkToStory ? <div className="summary-link" onClick={(() => this.goToStoryDetail(story.storyId))}>
                    <FormattedMessage
                        id='goToWorkflow'
                        defaultMessage='Go to Workflow'
                    />
                </div> : null}
                <div className="component-detail story-summary">
                    <Tab menu={{secondary: true, pointing: true}} panes={panes}
                         onTabChange={(event, data) => {
                             this.setState({
                                 activeTab: data.activeIndex
                             })
                         }}
                    />
                </div>
            </div>
        );
    }
}

export default StorySummary;
