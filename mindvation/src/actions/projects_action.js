/*
 * action 类型
 */

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const ADD_CHECKLIST = 'ADD_CHECKLIST';


/*
 * action 创建函数
 */

export function createProject(project) {
    return {type: CREATE_PROJECT, project}
}

export function addChecklist(project, checklist) {
    return {type: ADD_CHECKLIST, project, checklist}
}