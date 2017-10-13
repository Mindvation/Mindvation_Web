import {CREATED_TAG, RETRIEVED_TAGS} from '../actions/tags_action';

function tags(state = [], action) {
    switch (action.type) {
        case CREATED_TAG:
            return [...state, action.tag];
        case RETRIEVED_TAGS:
            return action.tags;
        default:
            return state
    }
}

export default tags;