import React, {Component} from 'react';
import {Button, Comment, Form, Header, Icon} from 'semantic-ui-react';
import Mention from './Mention';
import PropTypes from 'prop-types';

const comments = [{
    author: {
        text: 'Bob',
        value: '43845076',
        image: require('../../res/image/photo.jpg')
    },
    time: '2017/09/04 17:42',
    text: 'How artistic!',
    approve: ['43845076', '43845077'],
    disagree: []
}, {
    author: {
        text: 'Frank',
        value: '43845077',
        image: require('../../res/image/photo.jpg')
    },
    time: 'Yesterday at 12:30',
    text: 'This has been very useful for my research. Thanks as well!',
    approve: ['43845076'],
    disagree: ['43547206', '43798834']
}, {
    author: {
        text: 'Darcy',
        value: '43547206',
        image: require('../../res/image/photo.jpg')
    },
    time: 'Today at 15:45',
    text: 'Dude, this is awesome. Thanks so much!',
    approve: ['43845076'],
    disagree: ['43547206', '43798834']
}];

class MVComment extends Component {

    render() {

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
                                    <p>{item.text}</p>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action><Icon name='thumbs up' size='large'
                                                          color='yellow'/>{item.approve.length}</Comment.Action>
                                    <Comment.Action><Icon name='thumbs down' size='large'
                                                          color='yellow'/>{item.disagree.length}</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    })
                }
                <div>
                    <Mention/>
                    <Button content='Send' primary/>
                </div>
            </Comment.Group>
        );
    }
}

MVComment.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string
};

export default MVComment;
