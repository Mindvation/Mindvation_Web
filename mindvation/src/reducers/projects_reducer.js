import {CREATE_PROJECT, RETRIEVED_PROJECTS} from '../actions/projects_action';

let projectId = 0;

function projects(state = {
    projects: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case CREATE_PROJECT:
            let temp = {...state};
            temp.projects.push(action.project);
            return temp;
        case RETRIEVED_PROJECTS:
            return action.projects;
        default:
            return state
    }
}

export default projects;