/*
 * action 类型
 */

export const CREATE_PROJECT = 'CREATE_PROJECT';


/*
 * action 创建函数
 */

export function createProject(project) {
    return {type: CREATE_PROJECT, project}
}