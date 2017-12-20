import React, {Component} from 'react';
import Comment from '../common/Comment';
import {Button, Image, Transition} from 'semantic-ui-react';
import MVImage from "../common/Image";
import {Anchor} from 'antd';
import {FormattedMessage} from 'react-intl';
import Mention from '../common/Mention';
import {getStaffId} from '../../util/UserStore';

const {Link} = Anchor;

class QuestionDetail extends Component {

    state = {
        commentIndex: '',
        showAnswerBox: false
    };

    changeCommentIndex = (index) => {
        if (this.state.commentIndex === index) {
            this.setState({
                commentIndex: ''
            })
        } else {
            this.setState({
                commentIndex: index
            })
        }
    };

    answerQuestion = () => {
        if (this.state.showAnswerBox) return;
        this.setState({
            showAnswerBox: true
        })
    };

    cancelAnswer = () => {
        this.setState({
            showAnswerBox: false
        })
    };

    updateAnswerComment = (comment, action, callback) => {
        const {question, dispatch} = this.props;
        if (action === 'add') {
        } else {
        }
        callback && callback();
    };

    render() {
        const {question} = this.props;

        return (
            question ? <div>
                <div className="reward-question">
                    <div className="question-author">
                        <div className="question-avatar">
                            <Image className="question-avatar-img"
                                   src={question.author.image}/>
                        </div>
                        <div className="question-author-right">
                            <div className="author-name">{question.author.name}</div>
                            <div className="question-time">{question.time}</div>
                        </div>
                    </div>
                    <div className="question-content">
                        {question.text}
                    </div>
                    <div className="question-bottom">
                        <div className="reward-score">
                            <MVImage name="welfare_ic"/>
                            {question.reward}
                        </div>
                        <div
                            className={"tag-selected " + "tag-style tag-style-" + (question.tag.tagStyle || 'default')}>
                            {question.tag.name}
                        </div>
                    </div>
                    {this.props.active ?
                        <div className="answer-btn-anchor">
                            <Anchor offsetTop={84}>
                                <Link href="#answe-question" title={
                                    <div className="answer-btn-img" onClick={() => this.answerQuestion()}>
                                        <MVImage name="answer_btn"/>
                                    </div>}
                                />
                            </Anchor>
                        </div> : null}
                </div>
                {question.answers && question.answers.length > 0 ?
                    <div className="reward-answers">
                        {question.answers.map((answer, i) => {
                            return <div className="reward-answer" key={i}>
                                <div className="question-author">
                                    <div className="question-avatar">
                                        <Image className="question-avatar-img"
                                               src={answer.author.image}/>
                                    </div>
                                    <div className="question-author-right">
                                        <div className="author-name">{answer.author.name}</div>
                                        <div className="question-time">{answer.time}</div>
                                    </div>
                                </div>
                                <div className="answer-adopt">
                                    <MVImage name={answer.isAdopt ? "adopt_ic_pre" : "adopt_ic"}
                                             style={{marginRight: 0}}/>
                                </div>
                                <div className="question-content">
                                    {answer.text}
                                </div>
                                <div className="answer-bottom">
                                    <div>
                                        {answer.approve.indexOf(getStaffId()) > -1 ?
                                            <MVImage name="like_withMe"/> :
                                            <MVImage name="like"/>}
                                        {answer.approve.length}
                                    </div>
                                    <div>
                                        {answer.disagree.indexOf(getStaffId()) > -1 ? <MVImage name="dislike_withMe"/> :
                                            <MVImage name="dislike"/>}
                                        {answer.disagree.length}
                                    </div>
                                    <div onClick={() => {
                                        this.changeCommentIndex(i)
                                    }}>
                                        <MVImage name="reply"/>{answer.comments.length}
                                    </div>
                                </div>
                                <Transition visible={this.state.commentIndex === i} animation='slide down'
                                            duration={250}>
                                    <div className="reward-comment">
                                        <Comment comments={answer.comments}
                                                 changeComment={(comment, action, callback) => {
                                                     this.updateAnswerComment(comment, action, callback)
                                                 }}/>
                                    </div>
                                </Transition>
                            </div>
                        })}
                    </div> : null}
                {this.state.showAnswerBox ? <div className="comment-footer" id="answe-question">
                    <div style={{textAlign: 'left'}}>
                        <Mention wrappedComponentRef={node => this.mentionNode = node}/>
                    </div>
                    <Button onClick={() => this.cancelAnswer()} className="comment-action-button"
                            secondary>
                        <FormattedMessage
                            id='cancel'
                            defaultMessage='Cancel'
                        />
                    </Button>
                    <Button className="comment-action-button"
                            primary>
                        <FormattedMessage
                            id='send'
                            defaultMessage='Send'
                        />
                    </Button>
                </div> : null}
            </div> : null
        );
    }
}

export default QuestionDetail;