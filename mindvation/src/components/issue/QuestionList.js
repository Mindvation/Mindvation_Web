import React, {Component} from 'react';
import QuestionDetail from './QuestionDetail';
import {getIssueList} from '../../actions/issue_action';

class QuestionList extends Component {
    componentWillReceiveProps(nextProps) {
        const {subject} = nextProps;
        if (!subject.id || subject.id === this.props.subject.id) return;
        this.props.dispatch(getIssueList(subject));
    }

    checkIssueDetail = (issue) => {
        this.props.dispatch(getIssueList(this.props.subject, issue.issueId));
    };

    render() {
        const {active, issue, dispatch, subject} = this.props;
        return (
            <div>
                <div className="question-list">
                    {issue.totalElements && issue.totalElements.length > 0 ?
                        issue.totalElements.map((item, i) => {
                            return <div key={i}
                                        className={((issue.issueDetail.issueId === item.issueId) ? "issue-selected " : "") + (item.isResolved ? "issue-resolved" : "")}
                                        onClick={() => {
                                            this.checkIssueDetail(item)
                                        }}
                            >{i + 1}</div>
                        })
                        : null}
                </div>
                <QuestionDetail dispatch={dispatch} subject={subject} active={active} question={issue.issueDetail}/>
            </div>
        );
    }
}

export default QuestionList;