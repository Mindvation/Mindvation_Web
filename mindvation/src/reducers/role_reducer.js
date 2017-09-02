import {UPDATE_ROLE_MEMBERS, CLEAR_TEMP_ROLES, GET_ROLES_BY_MODEL} from '../actions/role_action';

function role(state = [], action) {
    switch (action.type) {
        case GET_ROLES_BY_MODEL:
            return action.roles;
        case UPDATE_ROLE_MEMBERS:
            let tempState = state;
            tempState.some((role) => {
                if (role.key === action.roleMember.key) {
                    Object.assign(role, action.roleMember);
                    return true;
                }
            });
            return Object.assign([], state, tempState);
        case CLEAR_TEMP_ROLES:
            return [];
        default:
            return state
    }
}

export default role;