import {post} from '../util/request';
import {convertStoryToServer} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

/*
 * action 类型
 */

export const ADD_STORY_TO_LIST = 'ADD_STORY_TO_LIST';
export const UPDATE_STORIES = 'UPDATE_STORIES';
export const RETRIEVED_STORIES = 'RETRIEVED_STORIES';

/*
 * action 创建函数
 */

function createdStory(story) {
    return {type: ADD_STORY_TO_LIST, story}
}

export function addStoryToList(story, callback) {
    return dispatch => {
        const params = convertStoryToServer(story);
        StaticLoad.show("createStory");
        post(url.createStory, params)
            .then((res) => {
                StaticLoad.remove("createStory");
                dispatch(createdStory(res.responseBody));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createStory");
                StaticDialog.show("createStory-error", error.responseCode, error.message);
            });
    }
}

export function updateStories(story) {
    return {type: UPDATE_STORIES, story}
}

function retrievedStories(stories) {
    return {type: RETRIEVED_STORIES, stories}
}

export function retrieveStories(page, pageSize, reqId) {
    return dispatch => {
        const params = {
            "reqmntId": reqId,
            "staffId": "m2",
            "page": page,
            "pageSize": pageSize
        };

        post(url.retrieveStories, params)
            .then((res) => {
                dispatch(retrievedStories(res.responseBody))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}