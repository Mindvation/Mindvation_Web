import React, {Component} from 'react';
import {Button, Transition, Icon, Segment} from 'semantic-ui-react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class Discussion extends Component {
    state = {
        visible: false
    };

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    };


    render() {
        const {visible} = this.state;
        const {requirement, dispatch} = this.props;
        return (
            <div>
                <div className={"discussion-comment-link pointer-cursor"} onClick={this.toggleVisibility}>
                    <Icon name='talk outline'/>
                    {requirement.comments.length}
                </div>
                <Transition visible={visible} animation='slide down' duration={250}>
                    <Segment>
                        <Comment requirement={requirement} dispatch={dispatch}/>
                    </Segment>
                </Transition>
            </div>
        );
    }
}

Discussion.propTypes = {};

export default Discussion;
