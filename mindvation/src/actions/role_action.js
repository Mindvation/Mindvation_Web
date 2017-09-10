/*
 * action 类型
 */

export const UPDATE_ROLE_MEMBERS = 'UPDATE_ROLE_MEMBERS';
export const CLEAR_TEMP_ROLES = 'CLEAR_TEMP_ROLES';
export const GET_ROLES_BY_MODEL = 'GET_ROLES_BY_MODEL';
export const SET_ROLES = 'SET_ROLES';

/*
 * action 创建函数
 */
export function updateRoleMembers(roleMember) {
    return {type: UPDATE_ROLE_MEMBERS, roleMember}
}

export function clearTempRoles() {
    return {type: CLEAR_TEMP_ROLES}
}

export function setRoles(roles) {
    return {type: SET_ROLES, roles}
}

function retrievedRoles(roles) {
    return {type: GET_ROLES_BY_MODEL, roles}
}

export function getRolesByModel(model) {
    return dispatch => {
        fetch('/stub/getRolesByModel.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let roles = {};
                data.some((option) => {
                    if (option.model === model) {
                        roles = option.roles;
                        return true
                    }
                });
                dispatch(retrievedRoles(roles));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}
