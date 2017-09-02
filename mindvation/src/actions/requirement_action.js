/*
 * action 类型
 */

export const CREATE_REQUIREMENT = 'CREATE_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';

/*
 * action 创建函数
 */

export function createRequirement() {
    return {type: CREATE_REQUIREMENT}
}

export function updateRequirement(requirement) {
    return {type: UPDATE_REQUIREMENT, requirement}
}
