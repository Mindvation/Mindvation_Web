/*
 * action 类型
 */

export const CREATE_REQUIREMENTS = 'CREATE_REQUIREMENTS';
export const UPDATE_REQUIREMENTS = 'UPDATE_REQUIREMENTS';

/*
 * action 创建函数
 */

export function createRequirements(requirement) {
    return {type: CREATE_REQUIREMENTS, requirement}
}

export function updateRequirements(requirement) {
    return {type: UPDATE_REQUIREMENTS, requirement}
}