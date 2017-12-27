import {CREATE_PROJECT, RETRIEVED_PROJECTS} from '../actions/projects_action';

function projects(state = {
    projects: [],
    totalElements: 1
}, action) {
    switch (action.type) {
        case CREATE_PROJECT:
            let temp = {...state};
            temp.projects.push(action.project);
            return temp;
        case RETRIEVED_PROJECTS:
            return {
                projects: action.projects.content,
                totalElements: action.projects.totalElements
            };
        default:
            return state
    }
}

export default projects;