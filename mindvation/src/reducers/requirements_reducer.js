import {CREATE_REQUIREMENTS, UPDATE_REQUIREMENTS} from '../actions/requirements_action';
import {SET_REQUIREMENT} from '../actions/project_action';

let reqId = 0;

function requirements(state = [], action) {
    switch (action.type) {
        case CREATE_REQUIREMENTS:
            action.requirement.reqId = "R" + reqId++;
            return [...state,
                action.requirement];
        case UPDATE_REQUIREMENTS:
            return Object.assign([], state, action.requirement);
        case SET_REQUIREMENT:
            return action.requirements || [];
        default:
            return state
    }
}

export default requirements;