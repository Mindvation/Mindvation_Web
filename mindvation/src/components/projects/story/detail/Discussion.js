import React, {Component} from 'react';
import {Transition} from 'semantic-ui-react';
import Comment from '../../../common/Comment';
import {createStoryComment, voteStoryComment} from '../../../../actions/story_action';
import Image from '../../../common/Image';
import {FormattedMessage} from 'react-intl';

class Discussion extends Component {
    state = {
        visible: true
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
                <div className="discussion-comment-header display-flex">
                    <Image name="comment"/>
                    <div className="task-id">
                        <FormattedMessage
                            id='comment'
                            defaultMessage='Comment'
                        />
                        {/*{comments.length}*/}
                    </div>
                    <div className={"comment-toggle-img pointer-cursor" + (visible ? " toggle-visible" : "")}
                         onClick={this.toggleVisibility}>
                        <Image name="drop_down_ic" style={{marginRight: 0}}/>
                    </div>
                </div>
                <Transition visible={visible} animation='slide down' duration={250}>
                    <div>
                        <Comment comments={comments} dispatch={dispatch}
                                 changeComment={(comment, action, callback) => this.updateStory(comment, action, callback)}/>
                    </div>
                </Transition>
            </div>
        );
    }
}

export default Discussion;
