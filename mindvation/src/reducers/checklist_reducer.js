import {
    ADD_CHECKLIST,
    CLEAR_TEMP_CHECKLIST,
    ADD_TEMP_CHECKLISTS,
    DELETE_CHECKLIST,
    EDIT_CHECKLIST
} from '../actions/checklist_action';

function checklist(state = [], action) {
    switch (action.type) {
        case ADD_CHECKLIST:
            return [...state,
                action.checklist];
        case CLEAR_TEMP_CHECKLIST:
            return [];
        case ADD_TEMP_CHECKLISTS:
            return Object.assign([], state, action.checklists);
        case DELETE_CHECKLIST:
            state.splice(state.indexOf(action.checklist), 1);
            return Object.assign([], state);
        case EDIT_CHECKLIST:
            return Object.assign([], state, action.checklist);
        default:
            return state
    }
}

export default checklist;