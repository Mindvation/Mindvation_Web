/*
 * action 类型
 */

export const GET_PROJECT_BY_ID = 'GET_PROJECT_BY_ID';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';


/*
 * action 创建函数
 */
function retrievedProject(project) {
    return {type: GET_PROJECT_BY_ID, project}
}

export function getProjectById(id) {
    return dispatch => {
        fetch('/stub/getProjectById.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.projectId = id;
                dispatch(retrievedProject(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}

export function updateProject(updatedInfo) {
    return {type: UPDATE_PROJECT, updatedInfo}
}