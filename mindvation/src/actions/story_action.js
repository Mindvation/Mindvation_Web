import {post} from '../util/request';
import {
    convertStoryToLocal,
    convertStoryBasicToServer,
    convertStoryBasicToLocal,
    convertStoryStatusToServer,
    convertStoryStatusToLocal,
    convertStoryAdditionalToServer,
    convertStoryAdditionalToLocal,
    convertTaskToServer,
    convertTaskToLocal,
    convertTaskStatusToServer,
    convertStoryOptionalToServer,
    convertStoryOptionalToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';
/*
 * action 类型
 */

export const UPDATE_STORY = 'UPDATE_STORY';
export const GET_STORY_BY_ID = 'GET_STORY_BY_ID';
export const ADD_TASK_TO_STORY = 'ADD_TASK_TO_STORY';
export const UPDATE_STORY_TASK = 'UPDATE_STORY_TASK';

/*
 * action 创建函数
 */

export function updateStory(story) {
    return {type: UPDATE_STORY, story}
}

function retrievedStory(story) {
    return {type: GET_STORY_BY_ID, story}
}

function addTaskToStory(task) {
    return {type: ADD_TASK_TO_STORY, task}
}

function updateStoryTask(task) {
    return {type: UPDATE_STORY_TASK, task}
}

export function getStoryById(id) {
    return dispatch => {
        StaticLoad.show("getStoryById");
        post(url.getStoryById, {
            "storyId": id,
            "staffId": getStaffId()
        })
            .then((res) => {
                StaticLoad.remove("getStoryById");
                const story = convertStoryToLocal(res.responseBody.storyDetail);
                story.authCode = res.responseBody.staffAuthInfo;
                dispatch(retrievedStory(story));
            })
            .catch((error) => {
                StaticLoad.remove("getStoryById");
                StaticDialog.show("getStoryById-error", error.responseCode, error.message);
                console.info(error);
                dispatch(retrievedStory({}));
            });
    }
}

export function updateStoryBasic(basicInfo, callback) {
    return dispatch => {
        const params = convertStoryBasicToServer(basicInfo);
        StaticLoad.show("updateStoryBasic");
        post(url.updateStory, params)
            .then((res) => {
                StaticLoad.remove("updateStoryBasic");
                const story = convertStoryBasicToLocal(res.responseBody.storyDetail);
                dispatch(updateStory(story));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateStoryBasic");
                StaticDialog.show("updateStoryBasic-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateStoryAdditional(additionalInfo, callback) {
    return dispatch => {
        const params = convertStoryAdditionalToServer(additionalInfo);
        StaticLoad.show("updateStoryAdditional");
        post(url.updateStory, params)
            .then((res) => {
                StaticLoad.remove("updateStoryAdditional");
                const story = convertStoryAdditionalToLocal(res.responseBody.storyDetail);
                story.authCode = res.responseBody.staffAuthInfo;
                dispatch(updateStory(story));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateStoryAdditional");
                StaticDialog.show("updateStoryAdditional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateStoryStatus(statusInfo) {
    return dispatch => {
        const params = convertStoryStatusToServer(statusInfo);
        StaticLoad.show("updateStoryStatus");
        post(url.updateStory, params)
            .then((res) => {
                StaticLoad.remove("updateStoryStatus");
                const story = convertStoryStatusToLocal(res.responseBody.storyDetail);
                dispatch(updateStory(story));
            })
            .catch((error) => {
                StaticLoad.remove("updateStoryStatus");
                StaticDialog.show("updateStoryStatus-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateStoryOptional(optionalInfo, callback) {
    return dispatch => {
        const params = convertStoryOptionalToServer(optionalInfo);
        StaticLoad.show("updateStoryOptional");
        post(url.updateStory, params)
            .then((res) => {
                StaticLoad.remove("updateStoryOptional");
                const story = convertStoryOptionalToLocal(res.responseBody.storyDetail);
                dispatch(updateStory(story));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateStoryOptional");
                StaticDialog.show("updateStoryOptional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function addTask(taskInfo, callback) {
    return dispatch => {
        const params = convertTaskToServer(taskInfo);
        StaticLoad.show("addTask");
        post(url.addTask, params)
            .then((res) => {
                StaticLoad.remove("addTask");
                const {task, story} = convertTaskToLocal(res.responseBody);
                dispatch(addTaskToStory(task));
                dispatch(updateStory(story));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("addTask");
                StaticDialog.show("addTask-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateTaskStatus(statusInfo, callback) {
    return dispatch => {
        const params = convertTaskStatusToServer(statusInfo);
        StaticLoad.show("updateTaskStatus");
        post(url.updateTask, params)
            .then((res) => {
                StaticLoad.remove("updateTaskStatus");
                const {task, story} = convertTaskToLocal(res.responseBody);
                dispatch(updateStoryTask(task));
                dispatch(updateStory(story));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateTaskStatus");
                StaticDialog.show("updateTaskStatus-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}