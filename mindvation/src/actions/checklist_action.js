/*
 * action 类型
 */

export const ADD_CHECKLIST = 'ADD_CHECKLIST';
export const CLEAR_TEMP_CHECKLIST = 'CLEAR_TEMP_CHECKLIST';

/*
 * action 创建函数
 */

export function addChecklist(checklist) {
    return {type: ADD_CHECKLIST, checklist}
}

export function clearTempChecklist() {
    return {type: CLEAR_TEMP_CHECKLIST}
}