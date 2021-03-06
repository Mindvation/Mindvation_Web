import React, {Component} from 'react';
import Comment from '../common/Comment';
import {Button, Image, Transition} from 'semantic-ui-react';
import MVImage from "../common/Image";
import {Anchor, Popconfirm} from 'antd';
import {FormattedMessage} from 'react-intl';
import Mention from '../common/Mention';
import {getStaffId} from '../../util/UserStore';
import {
    answerIssue,
    updateAnswerJudgement,
    adoptAnswer,
    createAnswerComment,
    voteAnswerComment
} from '../../actions/issue_action';

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

    sendAnswer = () => {
        let answerInfo = this.mentionNode.getInfo();
        this.props.dispatch(answerIssue(this.props.question, answerInfo, () => {
            this.mentionNode.handleReset();
            this.cancelAnswer();
        }))
    };

    updateAnswerComment = (answer, comment, action, callback) => {
        const {question, dispatch} = this.props;
        if (action === 'add') {
            dispatch(createAnswerComment(question, answer, comment, callback));
        } else {
            dispatch(voteAnswerComment(answer, comment, action));
        }
    };

    agreeAnswer = (answer) => {
        answer.action = 'like';
        this.props.dispatch(updateAnswerJudgement(answer));
    };

    disagreeAnswer = (answer) => {
        answer.action = 'dislike';
        this.props.dispatch(updateAnswerJudgement(answer));
    };

    userAdoptAnswer = (answer) => {
        this.props.dispatch(adoptAnswer(this.props.question, answer));
    };

    render() {
        const {question} = this.props;
        return (
            question ? <div>
                <div className="issue-question">
                    <div className="question-author">
                        <div className="question-avatar">
                            <Image className="question-avatar-img"
                                   src={question.author.image}/>
                        </div>
                        <div className="question-author-right">
                            <div className="author-name">{question.author.text}</div>
                            <div className="question-time">{question.time}</div>
                        </div>
                    </div>
                    <div className="question-content read-only-text">
                        <div className="simditor">
                            <div className="simditor-body" dangerouslySetInnerHTML={{__html: question.text}}/>
                        </div>
                    </div>
                    <div className="question-bottom">
                        <div className="issue-score">
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
                                <Link href="#answer-question" title={
                                    <div className="answer-btn-img" onClick={() => this.answerQuestion()}>
                                        <MVImage name="answer_btn"/>
                                    </div>}
                                />
                            </Anchor>
                        </div> : null}
                </div>
                {question.answers && question.answers.length > 0 ?
                    <div className="issue-answers">
                        {question.answers.map((answer, i) => {
                            return <div className="issue-answer" key={i}>
                                <div className="question-author">
                                    <div className="question-avatar">
                                        <Image className="question-avatar-img"
                                               src={answer.author.image}/>
                                    </div>
                                    <div className="question-author-right">
                                        <div className="author-name">{answer.author.text}</div>
                                        <div className="question-time">{answer.time}</div>
                                    </div>
                                </div>
                                <div className="answer-adopt">
                                    {!question.isResolved && getStaffId() === question.author.value ?
                                        <Popconfirm placement="topRight" title={'采纳该答案之后，回答者会获取相应的积分或标签，且不可更改，是否确认采纳？'}
                                                    onConfirm={() => this.userAdoptAnswer(answer)}
                                                    okText={
                                                        <FormattedMessage
                                                            id='yes'
                                                            defaultMessage='Yes'
                                                        />
                                                    }
                                                    cancelText={
                                                        <FormattedMessage
                                                            id='no'
                                                            defaultMessage='No'
                                                        />
                                                    }>
                                            <div>
                                                <MVImage name="adopt_ic"
                                                         style={{marginRight: 0}}/>
                                            </div>
                                        </Popconfirm>
                                        : null}
                                    {question.isResolved && answer.isAdopt ?
                                        <MVImage name="adopt_ic_pre"
                                                 style={{marginRight: 0}}/> : null}
                                </div>
                                <div className="question-content">
                                    {answer.text}
                                </div>
                                <div className="answer-bottom">
                                    <div onClick={() => this.agreeAnswer(answer)}>
                                        {answer.approve.indexOf(getStaffId()) > -1 ?
                                            <MVImage name="like_withMe"/> :
                                            <MVImage name="like"/>}
                                        {answer.approve.length}
                                    </div>
                                    <div onClick={() => this.disagreeAnswer(answer)}>
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
                                    <div className="issue-comment">
                                        <Comment comments={answer.comments}
                                                 changeComment={(comment, action, callback) => {
                                                     this.updateAnswerComment(answer, comment, action, callback)
                                                 }}/>
                                    </div>
                                </Transition>
                            </div>
                        })}
                    </div> : null}
                {this.state.showAnswerBox ? <div className="comment-footer" id="answer-question">
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
                    <Button onClick={() => {
                        this.sendAnswer()
                    }} className="comment-action-button"
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