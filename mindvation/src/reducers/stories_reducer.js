import {ADD_STORY_TO_LIST, UPDATE_STORIES, RETRIEVED_STORIES} from '../actions/stories_action';
import {SET_STORIES} from '../actions/requirement_action';

function stories(state = {
    stories: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case ADD_STORY_TO_LIST:
            let temp = {...state};
            temp.stories.push(action.story);
            return temp;
        case UPDATE_STORIES:
            return Object.assign([], state, action.story);
        case SET_STORIES:
        case RETRIEVED_STORIES:
            return action.stories || {
                stories: [],
                totalElements: 0
            };
        default:
            return state
    }
}

export default stories;