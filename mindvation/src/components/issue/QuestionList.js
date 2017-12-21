import React, {Component} from 'react';
import QuestionDetail from './QuestionDetail';
import {getIssueList} from '../../actions/issue_action';

class QuestionList extends Component {
    componentDidMount() {
        this.props.dispatch(getIssueList());
    };

    pageChange = (page) => {
        console.info(page);
    };

    getQuestionList = (total) => {
        let res = [];
        for (let i = 0; i < total.length; i++) {
            res.push(<div key={i}>{i}</div>)
        }
        return res;
    };

    render() {
        const {active, issue, dispatch} = this.props;
        return (
            <div>
                <div className="question-list">
                    {this.getQuestionList(issue.totalElements)}
                </div>
                <QuestionDetail dispatch={dispatch} active={active} question={issue.issues[0]}/>
            </div>
        );
    }
}

export default QuestionList;