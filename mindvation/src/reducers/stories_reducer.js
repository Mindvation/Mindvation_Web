import {ADD_STORY_TO_LIST, UPDATE_STORIES} from '../actions/stories_action';

let storyId = 0;

function stories(state = [], action) {
    switch (action.type) {
        case ADD_STORY_TO_LIST:
            action.story.storyId = "S" + storyId++;
            return [...state,
                action.story];
        case UPDATE_STORIES:
            return Object.assign([], state, action.story);
        default:
            return state
    }
}

export default stories;