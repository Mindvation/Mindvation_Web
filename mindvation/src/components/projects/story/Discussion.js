import React, {Component} from 'react';
import {Transition, Icon, Segment} from 'semantic-ui-react';
import Comment from '../../common/Comment';
import {createStoryComment, voteStoryComment} from '../../../actions/stories_action';

class Discussion extends Component {
    state = {
        visible: false
    };

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    updateStory = (comment, action, callback) => {
        const {story, dispatch} = this.props;
        if (action === 'add') {
            dispatch(createStoryComment(story, comment, callback));
        } else {
            dispatch(voteStoryComment(story, comment, action));
        }
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
                                 changeComment={(comment, action, callback) => this.updateStory(comment, action, callback)}/>
                    </Segment>
                </Transition>
            </div>
        );
    }
}

export default Discussion;
