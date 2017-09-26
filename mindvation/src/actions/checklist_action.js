/*
 * action 类型
 */

export const ADD_CHECKLIST = 'ADD_CHECKLIST';
export const CLEAR_TEMP_CHECKLIST = 'CLEAR_TEMP_CHECKLIST';
export const ADD_TEMP_CHECKLISTS = 'ADD_TEMP_CHECKLISTS';
export const DELETE_CHECKLIST = 'DELETE_CHECKLIST';
export const EDIT_CHECKLIST = 'EDIT_CHECKLIST';

/*
 * action 创建函数
 */

export function addChecklist(checklist) {
    return {type: ADD_CHECKLIST, checklist}
}

export function clearTempChecklist() {
    return {type: CLEAR_TEMP_CHECKLIST}
}

export function addTempChecklists(checklists) {
    return {type: ADD_TEMP_CHECKLISTS, checklists}
}

export function deleteChecklist(checklist) {
    return {type: DELETE_CHECKLIST, checklist}
}

export function editChecklist(checklist) {
    return {type: EDIT_CHECKLIST, checklist}
}