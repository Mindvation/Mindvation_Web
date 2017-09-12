import {
    GET_STORY_BY_ID,
    UPDATE_STORY
} from '../actions/story_action';

function story(state = {}, action) {
    switch (action.type) {
        case GET_STORY_BY_ID:
            return action.story;
        case UPDATE_STORY:
            return Object.assign({}, state, action.story);
        default:
            return state
    }
}

export default story;