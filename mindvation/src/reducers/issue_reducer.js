import {SET_ISSUES, SET_ISSUE_ANSWER, UPDATE_ISSUE_ANSWER} from '../actions/issue_action';

function issue(state = {}, action) {
    switch (action.type) {
        case SET_ISSUES:
            return action.issues;
        case SET_ISSUE_ANSWER:
            let temp = {...state};
            temp.issueDetail.answers.push(action.answer);
            return temp;
        case UPDATE_ISSUE_ANSWER:
            let temp2 = {...state};
            temp2.issueDetail.answers.some((item) => {
                if (item.answerId === action.answer.answerId) {
                    Object.assign(item, action.answer);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        default:
            return state
    }
}

export default issue;