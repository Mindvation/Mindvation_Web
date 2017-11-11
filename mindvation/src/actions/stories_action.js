import {post} from '../util/request';
import {
    convertStoryToServer,
    convertStoryCommentToServer,
    convertCommentToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

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
            "staffId": getStaffId(),
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

export function createStoryComment(story, comment, callback) {
    return dispatch => {
        const params = convertStoryCommentToServer(story, comment);
        post(url.createComment, params)
            .then((res) => {
                if (!story.comments) story.comments = [];
                const comment = convertCommentToLocal(res.responseBody);
                story.comments.push(comment);
                dispatch(updateStories(story));
                callback && callback();
            })
            .catch((error) => {
                StaticDialog.show("createStoryComment-error", error.responseCode, error.message);
            });
    }
}

export function voteStoryComment(story, comment, action) {
    return dispatch => {
        const params = {
            commentId: comment.commentId,
            remark: action === "upVote" ? "like" : "dislike",
            creatorId: getStaffId()
        };
        post(url.voteComment, params)
            .then((res) => {
                const comment = convertCommentToLocal(res.responseBody);
                story.comments.some((item) => {
                    if (item.commentId === comment.commentId) {
                        Object.assign(item, comment);
                        return true;
                    }
                });
                dispatch(updateStories(story));
            })
            .catch((error) => {
                StaticDialog.show("voteStoryComment-error", error.responseCode, error.message);
            });
    }
}