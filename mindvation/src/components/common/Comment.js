import React, {Component} from 'react';
import {Button, Comment} from 'semantic-ui-react';
import Mention from './Mention';
import PropTypes from 'prop-types';
import {dateFormat, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {getUser, getStaffId} from '../../util/UserStore';
import Image from './Image';

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
                text: getUser().staffInfo.name,
                value: getUser().staffInfo.staffId,
                image: getUser().staffInfo.avatar
            },
            time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            text: text,
            mentions: mentions,
            approve: [],
            disagree: [],
            reply: reply
        };
        changeComment(comment, 'add', this.mentionNode.handleReset);

    };

    approve = (comment) => {
        const {changeComment} = this.props;
        changeComment(comment, 'upVote');
    };

    disagree = (comment) => {
        const {changeComment} = this.props;
        changeComment(comment, 'downVote');
    };

    render() {
        const {comments} = this.props;
        return (
            <Comment.Group>
                {
                    comments.map((item, i) => {
                        return <Comment key={i}>
                            <div className="comment-author">
                                <Comment.Avatar src={item.author.image}/>
                                <div className="comment-author-right">
                                    <Comment.Author>{item.author.text}</Comment.Author>
                                    <Comment.Metadata>
                                        {item.time}
                                    </Comment.Metadata>
                                </div>
                            </div>
                            <Comment.Content>
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
                            </Comment.Content>
                            <Comment.Actions>
                                <Comment.Action onClick={() => this.approve(item)}>
                                    {item.approve.indexOf(getStaffId()) > -1 ? <Image name="like_withMe"/> :
                                        <Image name="like"/>}
                                    {item.approve.length}
                                </Comment.Action>
                                <Comment.Action onClick={() => this.disagree(item)}>
                                    {item.disagree.indexOf(getStaffId()) > -1 ? <Image name="dislike_withMe"/> :
                                        <Image name="dislike"/>}
                                    {item.disagree.length}
                                </Comment.Action>
                                <Comment.Action onClick={() => this.reply(item)}>
                                    <Image name="reply" style={{marginRight: 0}}/>
                                </Comment.Action>
                            </Comment.Actions>
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
