/*
 * action 类型
 */

export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CLEAR_TEMP_REQUIREMENT = 'CLEAR_TEMP_REQUIREMENT';
export const GET_REQUIREMENT_BY_ID = 'GET_REQUIREMENT_BY_ID';
export const SET_STORIES = 'SET_STORIES';

/*
 * action 创建函数
 */

export function updateRequirement(requirement) {
    return {type: UPDATE_REQUIREMENT, requirement}
}

export function clearTempRequirement() {
    return {type: CLEAR_TEMP_REQUIREMENT}
}

function retrievedRequirement(requirement) {
    return {type: GET_REQUIREMENT_BY_ID, requirement}
}

function setStories(stories) {
    return {type: SET_STORIES, stories}
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
                dispatch(setStories(data.stories));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}