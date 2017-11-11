import React, {Component} from 'react';
import {Button, Comment, Icon} from 'semantic-ui-react';
import Mention from './Mention';
import PropTypes from 'prop-types';
import {dateFormat, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {getUser, getStaffId} from '../../util/UserStore';

class MVComment extends Component {

    reply = (replyComment) => {
        this.mentionNode.addMentioned(replyComment);
    };

    cancelComment = () => {
        this.mentionNode.handleReset();
    };

    sendComment = () => {
        const {changeComment} = this.props;
        const {text, mentions, reply} = this.mentionNode.getInfo();
        if (isEmpty(text.trim())) return;
        const comment = {
            author: {
                text: getUser().name,
                value: getUser().staffId,
                image: getUser().avatar
            },
            time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            text: text,
            mentions: mentions,
            approve: [],
            disagree: [],
            reply: reply
        };
        changeComment(comment, 'add', this.mentionNode.handleReset);

        //this.mentionNode.handleReset();
    };

    approve = (comment) => {
        const {changeComment} = this.props;
        /*let approves = comment.approve;
        let disagrees = comment.disagree;
        disagrees.indexOf(logOnUser) > -1 ?
            disagrees.splice(disagrees.indexOf(logOnUser), 1) :
            null;

        approves.indexOf(logOnUser) > -1 ?
            approves.splice(approves.indexOf(logOnUser), 1) :
            approves.push(logOnUser);
        comment.approve = approves;
        comment.disagree = disagrees;*/
        changeComment(comment, 'upVote');
    };

    disagree = (comment) => {
        const {changeComment} = this.props;
        /*let approves = comment.approve;
        let disagrees = comment.disagree;
        disagrees.indexOf(logOnUser) > -1 ?
            disagrees.splice(disagrees.indexOf(logOnUser), 1) :
            disagrees.push(logOnUser);
        approves.indexOf(logOnUser) > -1 ?
            approves.splice(approves.indexOf(logOnUser), 1) :
            null;
        comment.disagree = disagrees;
        comment.approve = approves;*/
        changeComment(comment, 'downVote');
    };

    render() {
        const {comments} = this.props;
        return (
            <Comment.Group>
                {
                    comments.map((item, i) => {
                        return <Comment key={i}>
                            <Comment.Avatar src={item.author.image}/>
                            <Comment.Content>
                                <div className="display-flex">
                                    <Comment.Author>{item.author.text}</Comment.Author>
                                    <div style={{marginLeft: '1em'}}>
                                        <Comment.Metadata>
                                            {item.time}
                                        </Comment.Metadata>
                                    </div>
                                </div>
                                <Comment.Text>
                                    <div className="pre-line">
                                        {item.replyInfo && item.replyInfo.replyStaff ?
                                            <span className="mention-reply">
                                                <FormattedMessage
                                                    id='reply'
                                                    defaultMessage='Reply'
                                                />: {item.replyInfo.replyStaff.name}</span> : null
                                        }
                                        {item.text}
                                    </div>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action onClick={() => this.approve(item)}>
                                        <Icon name='thumbs up'
                                              size='large'
                                              color={item.approve.indexOf(getStaffId()) > -1 ? 'green' : 'grey'}/>
                                        {item.approve.length}
                                    </Comment.Action>
                                    <Comment.Action onClick={() => this.disagree(item)}>
                                        <Icon name='thumbs down'
                                              size='large'
                                              color={item.disagree.indexOf(getStaffId()) > -1 ? 'red' : 'grey'}/>
                                        {item.disagree.length}
                                    </Comment.Action>
                                    <Comment.Action onClick={() => this.reply(item)}>
                                        <FormattedMessage
                                            id='reply'
                                            defaultMessage='Reply'
                                        />
                                    </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    })
                }
                <div className="comment-footer">
                    <div style={{textAlign: 'left'}}>
                        <Mention wrappedComponentRef={node => this.mentionNode = node}/>
                    </div>
                    <Button onClick={() => this.cancelComment()} className="comment-action-button"
                            secondary>
                        <FormattedMessage
                            id='cancel'
                            defaultMessage='Cancel'
                        />
                    </Button>
                    <Button onClick={() => this.sendComment()} className="comment-action-button"
                            primary>
                        <FormattedMessage
                            id='send'
                            defaultMessage='Send'
                        />
                    </Button>
                </div>
            </Comment.Group>
        );
    }
}

MVComment.propTypes = {
    comments: PropTypes.array
};

export default MVComment;
