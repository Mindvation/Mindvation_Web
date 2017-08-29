import {GET_PROJECT_BY_ID, UPDATE_PROJECT} from '../actions/project_action';

function project(state = {}, action) {
    switch (action.type) {
        case GET_PROJECT_BY_ID:
            return action.project;
        case UPDATE_PROJECT:
            return Object.assign({}, state, action.updatedInfo);
        default:
            return state
    }
}

export default project;