import React, {Component} from 'react';
import {Button, Comment, Icon} from 'semantic-ui-react';
import Mention from './Mention';
import PropTypes from 'prop-types';
import {dateFormat, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

const logOnUser = '43845076';

class MVComment extends Component {

    replay = (author) => {
        this.mentionNode.addMentioned(author);
    };

    sendComment = () => {
        const {changeComment} = this.props;
        const {text} = this.mentionNode.getInfo();
        if (isEmpty(text.trim())) return;
        const comment = {
            author: {
                text: 'Bob',
                value: '43845076',
                image: require('../../res/image/photo.jpg')
            },
            time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            text: text,
            approve: [],
            disagree: []
        };
        changeComment(comment, 'add');

        this.mentionNode.handleReset();
    };

    approve = (comment) => {
        const {changeComment} = this.props;
        let approves = comment.approve;
        let disagrees = comment.disagree;
        disagrees.indexOf(logOnUser) > -1 ?
            disagrees.splice(disagrees.indexOf(logOnUser), 1) :
            null;

        approves.indexOf(logOnUser) > -1 ?
            approves.splice(approves.indexOf(logOnUser), 1) :
            approves.push(logOnUser);
        comment.approve = approves;
        comment.disagree = disagrees;
        changeComment(comment, 'update');
    };

    disagree = (comment) => {
        const {changeComment} = this.props;
        let approves = comment.approve;
        let disagrees = comment.disagree;
        disagrees.indexOf(logOnUser) > -1 ?
            disagrees.splice(disagrees.indexOf(logOnUser), 1) :
            disagrees.push(logOnUser);
        approves.indexOf(logOnUser) > -1 ?
            approves.splice(approves.indexOf(logOnUser), 1) :
            null;
        comment.disagree = disagrees;
        comment.approve = approves;
        changeComment(comment, 'update');
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
                                <Comment.Author as='a'>{item.author.text}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{item.time}</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <pre>{item.text}</pre>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action onClick={() => this.approve(item)}>
                                        <Icon name='thumbs up'
                                              size='large'
                                              color={item.approve.indexOf(logOnUser) > -1 ? 'green' : 'grey'}/>
                                        {item.approve.length}
                                    </Comment.Action>
                                    <Comment.Action onClick={() => this.disagree(item)}>
                                        <Icon name='thumbs down'
                                              size='large'
                                              color={item.disagree.indexOf(logOnUser) > -1 ? 'red' : 'grey'}/>
                                        {item.disagree.length}
                                    </Comment.Action>
                                    <Comment.Action onClick={() => this.replay(item.author)}>
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
                    <Mention wrappedComponentRef={node => this.mentionNode = node}/>
                    <Button onClick={() => this.sendComment()} className="comment-send-button"
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
