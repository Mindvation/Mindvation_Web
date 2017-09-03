import {CREATE_REQUIREMENTS} from '../actions/requirements_action';

let reqId = 0;

function projects(state = [], action) {
    switch (action.type) {
        case CREATE_REQUIREMENTS:
            action.requirement.reqId = "R" + reqId++;
            return [...state,
                action.requirement];
        default:
            return state
    }
}

export default projects;