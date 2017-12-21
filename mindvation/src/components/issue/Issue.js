import React, {Component} from 'react';
import QuestionList from './QuestionList';
import CreateIssue from './CreateIssue';

class Issue extends Component {

    render() {
        const {issue, dispatch, active} = this.props;
        return (
            <div>
                <CreateIssue dispatch={dispatch}/>
                <QuestionList dispatch={dispatch} active={active} issue={issue}/>
            </div>
        );
    }
}

export default Issue;