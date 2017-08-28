/*
 * action 类型
 */

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const RETRIEVED_PROJECTS = 'RETRIEVE_PROJECTS';


/*
 * action 创建函数
 */

export function createProject(project) {
    return {type: CREATE_PROJECT, project}
}

function retrievedProjects(projects) {
    return {type: RETRIEVED_PROJECTS, projects}
}

export function retrieveProjects(page, pageSize) {
    return dispatch => {
        fetch('../stub/retrieveProjects.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(retrievedProjects(data.slice((page - 1) * pageSize, page * pageSize)));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}