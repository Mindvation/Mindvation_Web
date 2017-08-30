/*
 * action 类型
 */

export const ADD_TASK = 'ADD_TASK';
export const CLEAR_TEMP_TASK = 'CLEAR_TEMP_TASK';
export const ADD_TEMP_TASKS = 'ADD_TEMP_TASKS';

/*
 * action 创建函数
 */

export function addTask(task) {
    return {type: ADD_TASK, task}
}

export function clearTempTask() {
    return {type: CLEAR_TEMP_TASK}
}

export function addTempTasks(tasks) {
    return {type: ADD_TEMP_TASKS, tasks}
}
