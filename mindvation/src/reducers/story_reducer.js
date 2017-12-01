import {
    GET_STORY_BY_ID,
    UPDATE_STORY,
    ADD_TASK_TO_STORY,
    UPDATE_STORY_TASK,
    CLEAR_STORY
} from '../actions/story_action';

function story(state = {}, action) {
    switch (action.type) {
        case GET_STORY_BY_ID:
            return action.story;
        case UPDATE_STORY:
            return Object.assign({}, state, action.story);
        case ADD_TASK_TO_STORY:
            let temp = {...state};
            temp.tasks.push(action.task);
            return temp;
        case UPDATE_STORY_TASK:
            let temp1 = {...state};
            Object.assign(temp1.tasks, action.task);
            return temp1;
        case CLEAR_STORY:
            return {};
        default:
            return state
    }
}

export default story;