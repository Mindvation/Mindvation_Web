import React, {Component} from 'react';
import {Pagination} from 'antd';
import QuestionDetail from './QuestionDetail';

class QuestionList extends Component {

    pageChange = (page) => {
        console.info(page);
    };

    getQuestionList = () => {
        let res = [];
        for (let i = 0; i < 6; i++) {
            res.push(<div key={i}>{i}</div>)
        }
        return res;
    };

    render() {
        return (
            <div>
                <div className="question-list">
                    {this.getQuestionList()}
                </div>
                <QuestionDetail active={this.props.active}/>
            </div>
        );
    }
}

export default QuestionList;