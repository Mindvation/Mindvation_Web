import {SEARCH_MEMBERS_BY_TAGS, CLEAR_TEMP_MEMBERS} from '../actions/member_action';

function member(state = [], action) {
    switch (action.type) {
        case SEARCH_MEMBERS_BY_TAGS:
            return action.members;
        case CLEAR_TEMP_MEMBERS:
            return [];
        default:
            return state
    }
}

export default member;