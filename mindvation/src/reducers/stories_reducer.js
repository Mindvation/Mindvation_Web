import {ADD_STORY_TO_LIST, UPDATE_STORIES} from '../actions/stories_action';
import {SET_STORIES} from '../actions/requirement_action';

let storyId = 0;
let crId = 0;

function stories(state = [], action) {
    switch (action.type) {
        case ADD_STORY_TO_LIST:
            action.story.storyId = action.storyType === 'story' ? "S" + storyId++ : "C" + crId++;
            return [...state,
                action.story];
        case UPDATE_STORIES:
            return Object.assign([], state, action.story);
        case SET_STORIES:
            return action.stories || [];
        default:
            return state
    }
}

export default stories;