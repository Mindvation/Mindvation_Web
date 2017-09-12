/*
 * action 类型
 */

export const UPDATE_STORY = 'UPDATE_STORY';
export const GET_STORY_BY_ID = 'GET_STORY_BY_ID';

/*
 * action 创建函数
 */

export function updateStory(story) {
    return {type: UPDATE_STORY, story}
}

function retrievedStory(story) {
    return {type: GET_STORY_BY_ID, story}
}

export function getStoryById(id) {
    return dispatch => {
        fetch('/stub/getStoryById.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.storyId = id;
                dispatch(retrievedStory(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}