import {LOGON_SUCCESS, LOG_OUT} from '../actions/logon_action';

function userInfo(state = {}, action) {
    switch (action.type) {
        case LOGON_SUCCESS:
            return action.userInfo;
        case LOG_OUT:
            return {};
        default:
            return state
    }
}

export default userInfo;