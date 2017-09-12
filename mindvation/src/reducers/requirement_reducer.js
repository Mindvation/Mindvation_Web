import {
    UPDATE_REQUIREMENT,
    CLEAR_TEMP_REQUIREMENT,
    GET_REQUIREMENT_BY_ID
} from '../actions/requirement_action';

function requirement(state = {}, action) {
    switch (action.type) {
        case UPDATE_REQUIREMENT:
            return Object.assign({}, state, action.requirement);
        case CLEAR_TEMP_REQUIREMENT:
            return {};
        case GET_REQUIREMENT_BY_ID:
            return action.requirement;
        default:
            return state
    }
}

export default requirement;