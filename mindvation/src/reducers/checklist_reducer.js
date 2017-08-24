import {ADD_CHECKLIST, CLEAR_TEMP_CHECKLIST} from '../actions/checklist_action';

let idNumber = 0;

function checklist(state = [], action) {
    switch (action.type) {
        case ADD_CHECKLIST:
            action.checklist.idNumber = "C" + idNumber++;
            return [...state,
                action.checklist];
        case CLEAR_TEMP_CHECKLIST:
            return [];
        default:
            return state
    }
}

export default checklist;