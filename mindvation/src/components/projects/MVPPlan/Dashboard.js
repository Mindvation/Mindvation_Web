import React, {Component} from 'react';
import DragDropContext from '../../common/DragDropContext';
import MoveProject from './MoveProject';
import {Rail, Sticky} from 'semantic-ui-react';
import StorySummary from '../../../containers/storySummary_container';
import {rtrvStoryList} from '../../../util/Service';
import $ from 'jquery';

class Dashboard extends Component {
    state = {
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
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: 0}, 500);
        this.setState({storyId: storyId})
    };

    closeSticky = () => {
        let targetElm = document.getElementById("dashboardSticky");
        $(targetElm).animate({right: -400}, 500);
    };

    render() {
        const {storyId, storyList} = this.state;
        return (
            <div onClick={() => this.closeSticky()}>
                {
                    (storyList && storyList.length > 0) ?
                        storyList.map((story, i) => {
                            return <MoveProject key={i} storyList={story} storyDetail={(storyId) => {
                                this.checkDetail(storyId)
                            }}/>
                        }) : null
                }

                <Rail id="dashboardSticky" position='right' className="summary-rail">
                    <Sticky>
                        <StorySummary storyId={storyId}/>
                    </Sticky>
                </Rail>
            </div>
        );
    }
}

export default DragDropContext(Dashboard);