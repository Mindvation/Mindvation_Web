import {CREATE_REQUIREMENT, UPDATE_REQUIREMENT} from '../actions/requirement_action';

function requirement(state = {}, action) {
    switch (action.type) {
        case CREATE_REQUIREMENT:
            return {};
        case UPDATE_REQUIREMENT:
            return Object.assign({}, state, action.requirement)
        default:
            return state
    }
}

export default requirement;