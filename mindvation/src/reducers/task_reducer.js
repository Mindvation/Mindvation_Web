import {ADD_TASK, CLEAR_TEMP_TASK, ADD_TEMP_TASKS} from '../actions/task_action';

let idNumber = 0;

function task(state = [], action) {
    switch (action.type) {
        case ADD_TASK:
            action.task.idNumber = "C" + idNumber++;
            return [...state,
                action.task];
        case CLEAR_TEMP_TASK:
            return [];
        case ADD_TEMP_TASKS:
            return action.tasks;
        default:
            return state
    }
}

export default task;