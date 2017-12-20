import React, {Component} from 'react';
import {Transition} from 'semantic-ui-react';
import Comment from '../../../common/Comment';
import {createRequirementComment, voteRequirementComment} from '../../../../actions/requirement_action';
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

    updateRequirement = (comment, action, callback) => {
        const {requirement, dispatch} = this.props;
        if (action === 'add') {
            dispatch(createRequirementComment(requirement, comment, callback));
        } else {
            dispatch(voteRequirementComment(requirement, comment, action));
        }
    };

    render() {
        const {visible} = this.state;
        const {comments = []} = this.props.requirement;
        return (
            <div>
                <Comment comments={comments}
                         changeComment={(comment, action, callback) => this.updateRequirement(comment, action, callback)}/>
                {/*<div className="discussion-comment-header display-flex">
                    <Image name="comment"/>
                    <div className="task-id">
                        <FormattedMessage
                            id='comment'
                            defaultMessage='Comment'
                        />
                        {comments.length}
                    </div>
                    <div className={"comment-toggle-img pointer-cursor" + (visible ? " toggle-visible" : "")}
                         onClick={this.toggleVisibility}>
                        <Image name="drop_down_ic" style={{marginRight: 0}}/>
                    </div>
                </div>
                <Transition visible={visible} animation='slide down' duration={250}>
                    <div>
                        <Comment comments={comments}
                                 changeComment={(comment, action, callback) => this.updateRequirement(comment, action, callback)}/>
                    </div>
                </Transition>*/}
            </div>
        );
    }
}

Discussion.propTypes = {};

export default Discussion;
