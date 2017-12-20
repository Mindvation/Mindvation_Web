import React, {Component} from 'react';
import QuestionDetail from './QuestionDetail';
import {getRewardList} from '../../actions/reward_action';

class QuestionList extends Component {
    componentDidMount() {
        this.props.dispatch(getRewardList());
    };

    pageChange = (page) => {
        console.info(page);
    };

    getQuestionList = (total) => {
        let res = [];
        for (let i = 0; i < total; i++) {
            res.push(<div key={i}>{i}</div>)
        }
        return res;
    };

    render() {
        const {active, reward, dispatch} = this.props;
        return (
            <div>
                <div className="question-list">
                    {this.getQuestionList(reward.totalElements)}
                </div>
                <QuestionDetail dispatch={dispatch} active={active} question={reward.rewards[0]}/>
            </div>
        );
    }
}

export default QuestionList;