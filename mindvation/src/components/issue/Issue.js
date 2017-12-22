import React, {Component} from 'react';
import QuestionList from './QuestionList';
import CreateIssue from './CreateIssue';

class Issue extends Component {

    render() {
        const {issue, dispatch, active, subject} = this.props;
        return (
            <div>
                <CreateIssue dispatch={dispatch} subject={subject}/>
                <QuestionList dispatch={dispatch} active={active} issue={issue} subject={subject}/>
            </div>
        );
    }
}

export default Issue;