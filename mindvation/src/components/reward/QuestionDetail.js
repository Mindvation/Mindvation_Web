import React, {Component} from 'react';
import Comment from '../common/Comment';
import {Button, Image, Transition} from 'semantic-ui-react';
import MVImage from "../common/Image";
import {Affix, Anchor} from 'antd';
import {FormattedMessage} from 'react-intl';
import Mention from '../common/Mention';

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

    render() {
        const comments = [{
            "commentId": "C7",
            "author": {
                "text": "Frank",
                "value": "E8",
                "image": "http://47.100.100.211:8080/mdvn-file-papi/f19f3e92-2be6-49e4-b086-d96d6a4d6e711470057469574862.jpg"
            },
            "time": "2017-11-11 06:07:26",
            "text": "怎样使用Flex布局",
            "approve": ["E8"],
            "disagree": []
        }, {
            "commentId": "C6",
            "author": {
                "text": "Bob",
                "value": "E3",
                "image": "http://47.100.100.211:8080/mdvn-file-papi/8d39e77c-10f8-4a3a-ad0e-ff5b326f2671114842724943480.jpg"
            },
            "time": "2017-11-10 08:44:33",
            "text": "参考这个：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html",
            "approve": ["E3", "E2", "E8", "E4"],
            "disagree": []
        }];

        return (
            <div>
                <div className="reward-question">
                    <div className="question-author">
                        <div className="question-avatar">
                            <Image className="question-avatar-img"
                                   src={"http://47.100.100.211:8080/mdvn-file-papi/f19f3e92-2be6-49e4-b086-d96d6a4d6e711470057469574862.jpg"}/>
                        </div>
                        <div className="question-author-right">
                            <div className="author-name">{'Frank'}</div>
                            <div className="question-time">{"2017-11-11 06:07:26"}</div>
                        </div>
                    </div>
                    <div className="question-content">
                        怎样实现垂直居中？
                    </div>
                    <div className="question-bottom">
                        <div className="reward-score">
                            <MVImage name="welfare_ic"/>
                            {50}
                        </div>
                        <div className={"tag-selected " + "tag-style tag-style-" + (1 || 'default')}>
                            {"React Native"}
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
                <div className="reward-answers">
                    <div className="reward-answer">
                        <div className="question-author">
                            <div className="question-avatar">
                                <Image className="question-avatar-img"
                                       src={"http://47.100.100.211:8080/mdvn-file-papi/f19f3e92-2be6-49e4-b086-d96d6a4d6e711470057469574862.jpg"}/>
                            </div>
                            <div className="question-author-right">
                                <div className="author-name">{'Bob'}</div>
                                <div className="question-time">{"2017-11-11 06:07:26"}</div>
                            </div>
                        </div>
                        <div className="answer-adopt">
                            <MVImage name="adopt_ic_pre" style={{marginRight: 0}}/>
                        </div>
                        <div className="question-content">
                            使用Flex布局
                        </div>
                        <div className="answer-bottom">
                            <div>
                                <MVImage name="like_withMe"/>
                                {5}
                            </div>
                            <div>
                                <MVImage name="dislike"/>
                                {0}
                            </div>
                            <div onClick={() => {
                                this.changeCommentIndex(1)
                            }}>
                                <MVImage name="reply"/>{2}
                            </div>
                        </div>
                        <Transition visible={this.state.commentIndex === 1} animation='slide down' duration={250}>
                            <div className="reward-comment">
                                <Comment comments={comments}/>
                            </div>
                        </Transition>
                    </div>
                    <div className="reward-answer">
                        <div className="question-author">
                            <div className="question-avatar">
                                <Image className="question-avatar-img"
                                       src={"http://47.100.100.211:8080/mdvn-file-papi/8d39e77c-10f8-4a3a-ad0e-ff5b326f2671114842724943480.jpg"}/>
                            </div>
                            <div className="question-author-right">
                                <div className="author-name">{'Darcy'}</div>
                                <div className="question-time">{"2017-11-11 06:07:26"}</div>
                            </div>
                        </div>
                        <div className="answer-adopt">
                            <MVImage name="adopt_ic" style={{marginRight: 0}}/>
                        </div>
                        <div className="question-content">
                            使用绝对定位
                        </div>
                        <div className="answer-bottom">
                            <div>
                                <MVImage name="like_withMe"/>
                                {1}
                            </div>
                            <div>
                                <MVImage name="dislike"/>
                                {1}
                            </div>
                            <div onClick={() => {
                                this.changeCommentIndex(2)
                            }}>
                                <MVImage name="reply"/>{0}
                            </div>
                        </div>
                        <Transition visible={this.state.commentIndex === 2} animation='slide down' duration={250}>
                            <div className="reward-comment">
                                <Comment comments={[]}/>
                            </div>
                        </Transition>
                    </div>
                </div>
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
            </div>
        );
    }
}

export default QuestionDetail;