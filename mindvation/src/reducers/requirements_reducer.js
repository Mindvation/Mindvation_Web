import {CREATED_REQUIREMENT, RETRIEVED_REQUIREMENTS} from '../actions/requirements_action';
import {SET_REQUIREMENT} from '../actions/project_action';

function requirements(state = {
    requirementInfos: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case CREATED_REQUIREMENT:
            let temp = {...state};
            temp.requirementInfos.push(action.requirement);
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
        default:
            return state
    }
}

export default requirements;