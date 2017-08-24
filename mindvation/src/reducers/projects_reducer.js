import {CREATE_PROJECT} from '../actions/projects_action';

let projectId = 0;

function project(state = [], action) {
    switch (action.type) {
        case CREATE_PROJECT:
            action.project.projectId = "P" + projectId++;
            return [...state,
                action.project];
        default:
            return state
    }
}

export default project;