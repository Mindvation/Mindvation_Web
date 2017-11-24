import {SET_USER, REMOVE_USER} from '../actions/user_action';

function userInfo(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.userInfo;
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}

export default userInfo;