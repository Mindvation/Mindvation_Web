import {SET_ISSUES} from '../actions/issue_action';

function issue(state = {
    issues: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case SET_ISSUES:
            return action.issues;
        default:
            return state
    }
}

export default issue;