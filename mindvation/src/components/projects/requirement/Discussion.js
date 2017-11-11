import React, {Component} from 'react';
import {Transition, Icon, Segment} from 'semantic-ui-react';
import Comment from '../../common/Comment';
import {createRequirementComment, voteRequirementComment} from '../../../actions/requirements_action';

class Discussion extends Component {
    state = {
        visible: false
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

    /*updateRequirement = (comment, action) => {
        const {requirement, dispatch} = this.props;
        if (action === 'add') {
            if (!requirement.comments) requirement.comments = [];
            requirement.comments.push(comment);
        } else {
            Object.assign(requirement.comments, comment);
            dispatch(updateRequirements(requirement));
        }
        dispatch(updateRequirements(requirement));
    };*/


    render() {
        const {visible} = this.state;
        const {comments = [], dispatch} = this.props.requirement;
        return (
            <div>
                <div className={"discussion-comment-link pointer-cursor"} onClick={this.toggleVisibility}>
                    <Icon name='talk outline'/>
                    {comments.length}
                </div>
                <Transition visible={visible} animation='slide down' duration={250}>
                    <Segment>
                        <Comment comments={comments} dispatch={dispatch}
                                 changeComment={(comment, action, callback) => this.updateRequirement(comment, action, callback)}/>
                    </Segment>
                </Transition>
            </div>
        );
    }
}

Discussion.propTypes = {};

export default Discussion;
