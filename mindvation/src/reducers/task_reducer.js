import {ADD_TASK, CLEAR_TEMP_TASK, ADD_TEMP_TASKS, DELETE_TASK, EDIT_TASK} from '../actions/task_action';

let idNumber = 0;

function task(state = [], action) {
    switch (action.type) {
        case ADD_TASK:
            action.task.idNumber = "T" + idNumber++;
            return [...state,
                action.task];
        case CLEAR_TEMP_TASK:
            return [];
        case ADD_TEMP_TASKS:
            return Object.assign([], state, action.tasks);
        case DELETE_TASK:
            state.splice(state.indexOf(action.task), 1);
            return Object.assign([], state);
        case EDIT_TASK:
            return Object.assign([], state, action.task);
        default:
            return state
    }
}

export default task;