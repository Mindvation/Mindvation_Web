/*
 * action 类型
 */

export const ADD_STORY_TO_LIST = 'ADD_STORY_TO_LIST';
export const UPDATE_STORIES = 'UPDATE_STORIES';

/*
 * action 创建函数
 */

export function addStoryToList(story, storyType) {
    return {type: ADD_STORY_TO_LIST, story, storyType}
}

export function updateStories(story) {
    return {type: UPDATE_STORIES, story}
}