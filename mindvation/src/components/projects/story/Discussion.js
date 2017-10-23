import React, {Component} from 'react';
import {Transition, Icon, Segment} from 'semantic-ui-react';
import Comment from '../../common/Comment';
import {updateStories} from '../../../actions/stories_action';

class Discussion extends Component {
    state = {
        visible: false
    };

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    updateRequirement = (comment, action) => {
        const {story, dispatch} = this.props;
        if (action === 'add') {
            story.comments.push(comment);
        } else {
            Object.assign(story.comments, comment);
            dispatch(updateStories(story));
        }
        dispatch(updateStories(story));
    };


    render() {
        const {visible} = this.state;
        const {comments = [], dispatch} = this.props.story;
        return (
            <div>
                <div className={"discussion-comment-link pointer-cursor"} onClick={this.toggleVisibility}>
                    <Icon name='talk outline'/>
                    {comments.length}
                </div>
                <Transition visible={visible} animation='slide down' duration={250}>
                    <Segment>
                        <Comment comments={comments} dispatch={dispatch}
                                 changeComment={(comment, action) => this.updateRequirement(comment, action)}/>
                    </Segment>
                </Transition>
            </div>
        );
    }
}

export default Discussion;
