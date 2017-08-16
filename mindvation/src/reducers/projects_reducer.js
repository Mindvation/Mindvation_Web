import {CREATE_PROJECT} from '../actions/projects_action';

function project(state = [], action) {
    switch (action.type) {
        case CREATE_PROJECT:
            return [...state,
                action.project];
        default:
            return state
    }
}

export default project;