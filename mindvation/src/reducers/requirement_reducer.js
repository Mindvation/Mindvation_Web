import {CREATE_REQUIREMENT, UPDATE_REQUIREMENT, CLEAR_TEMP_REQUIREMENT} from '../actions/requirement_action';

function requirement(state = {}, action) {
    switch (action.type) {
        case CREATE_REQUIREMENT:
            return {};
        case UPDATE_REQUIREMENT:
            return Object.assign({}, state, action.requirement);
        case CLEAR_TEMP_REQUIREMENT:
            return {};
        default:
            return state
    }
}

export default requirement;