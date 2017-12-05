import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import MoveProject from './MoveProject';
import StorySummary from '../../../containers/storySummary_container';
import {rtrvStoryList} from '../../../util/Service';
import $ from 'jquery';
import Image from '../../common/Image';

class Dashboard extends Component {
    state = {
        storyId: '',
        storyList: []
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
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: 0}, 500);
        this.setState({storyId: storyId})
    };

    closeSticky = () => {
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: -400}, 500);
    };

    checkHasStory = (storyList) => {
        if (storyList.length === 0) return true;
        let flag = false;
        storyList.map((story) => {
                story.sprintStoryLists.some((item) => {
                    if (item.stories && item.stories.length > 0) {
                        flag = true;
                        return true;
                    }
                });
            }
        );
        return flag;
    };

    render() {
        const {storyId, storyList} = this.state;
        const {id} = this.props.match.params;
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%'}} onClick={() => this.closeSticky()}>
                    {
                        this.checkHasStory(storyList) ?
                            storyList.map((story, i) => {
                                return <MoveProject key={i} projectId={id} storyList={story} storyDetail={(storyId) => {
                                    this.checkDetail(storyId)
                                }}/>
                            }) : <div className="display-center">
                                <div>
                                    <Image name="no_dashboard" style={{marginRight: 0}}/>
                                    <div className="no-element-alert">
                                        <div className="no-element-title">当前看板没有内容</div>
                                        <div className="no-element-text">快去创建任务吧</div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>

                <div id="dashboardSticky" className="summary-rail">
                    <StorySummary storyId={storyId}/>
                </div>
            </div>
        );
    }
}

export default DragDropContext(Dashboard);