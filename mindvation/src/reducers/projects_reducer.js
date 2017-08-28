import {CREATE_PROJECT, RETRIEVED_PROJECTS} from '../actions/projects_action';

let projectId = 0;

function project(state = [], action) {
    switch (action.type) {
        case CREATE_PROJECT:
            action.project.projectId = "P" + projectId++;
            return [...state,
                action.project];
        case RETRIEVED_PROJECTS:
            return action.projects;
        default:
            return state
    }
}

export default project;