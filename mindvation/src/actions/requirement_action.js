/*
 * action 类型
 */

export const CREATE_REQUIREMENT = 'CREATE_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CLEAR_TEMP_REQUIREMENT = 'CLEAR_TEMP_REQUIREMENT';
export const GET_REQUIREMENT_BY_ID = 'GET_REQUIREMENT_BY_ID';

/*
 * action 创建函数
 */

export function createRequirement() {
    return {type: CREATE_REQUIREMENT}
}

export function updateRequirement(requirement) {
    return {type: UPDATE_REQUIREMENT, requirement}
}

export function clearTempRequirement() {
    return {type: CLEAR_TEMP_REQUIREMENT}
}

function retrievedRequirement(requirement) {
    return {type: GET_REQUIREMENT_BY_ID, requirement}
}

export function getRequirementById(id) {
    return dispatch => {
        fetch('/stub/getRequirementById.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.reqId = id;
                dispatch(retrievedRequirement(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}