import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import MoveProject from './MoveProject';
import {Sidebar} from 'semantic-ui-react';
import StorySummary from '../../../containers/storySummary_container';
import {rtrvStoryList} from '../../../util/Service';

class Dashboard extends Component {
    state = {
        visible: false,
        storyId: '',
        storyList: ''
    };

    componentWillMount() {
        const {id} = this.props.match.params;
        rtrvStoryList(id, function (storyList) {
            this.setState({
                storyList: storyList
            })
        }.bind(this))
    };

    checkDetail = (storyId) => {
        this.setState({visible: true, storyId: storyId})
    };

    render() {
        const {visible, storyId, storyList} = this.state;
        return (
            <Sidebar.Pushable>
                <Sidebar
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    icon='labeled'
                >
                    <StorySummary storyId={storyId} linkToStory={false}/>
                </Sidebar>
                <Sidebar.Pusher>
                    <div className="component-container" onClick={() => this.setState({visible: false})}>
                        {
                            (storyList && storyList.length > 0) ?
                                storyList.map((story, i) => {
                                    return <MoveProject key={i} storyList={story} storyDetail={(storyId) => {
                                        this.checkDetail(storyId)
                                    }}/>
                                }) : null
                        }

                        {/*<DemoCalendar storyDetail={(storyId) => {
                            this.checkDetail(storyId)
                        }}/>*/}
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default DragDropContext(Dashboard);