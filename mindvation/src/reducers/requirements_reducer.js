import {CREATED_REQUIREMENT, RETRIEVED_REQUIREMENTS, UPDATE_REQUIREMENTS} from '../actions/requirements_action';
import {SET_REQUIREMENT} from '../actions/project_action';

function requirements(state = {
    requirementInfos: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case CREATED_REQUIREMENT:
            let temp = {...state};
            temp.requirementInfos.push(action.requirement);
            //temp.requirementInfos = [action.requirement].concat(temp.requirementInfos);
            return temp;
        case SET_REQUIREMENT:
            return action.requirements || {
                requirementInfos: [],
                totalElements: 0
            };
        case RETRIEVED_REQUIREMENTS:
            return action.requirements || {
                requirementInfos: [],
                totalElements: 0
            };
        case UPDATE_REQUIREMENTS:
            let temp2 = {...state};
            temp2.requirementInfos.some((req) => {
                if (req.reqId === action.requirement.reqId) {
                    Object.assign(req, action.requirement);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        default:
            return state
    }
}

export default requirements;