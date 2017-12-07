/*
 * action 类型
 */
import {post} from '../util/request';
import {setRoles} from './role_action';
import {
    convertRequirementToLocal,
    convertReqBasicToServer,
    convertReqBasicToLocal,
    convertReqOptionalToServer,
    convertReqOptionalToLocal,
    convertReqAdditionalToServer,
    convertReqAdditionalToLocal,
    convertReqStatusToServer,
    convertReqStatusToLocal,
    convertReqCommentToServer,
    convertCommentToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CLEAR_TEMP_REQUIREMENT = 'CLEAR_TEMP_REQUIREMENT';
export const GET_REQUIREMENT_BY_ID = 'GET_REQUIREMENT_BY_ID';
export const SET_STORIES = 'SET_STORIES';

/*
 * action 创建函数
 */

export function updateRequirement(requirement) {
    return {type: UPDATE_REQUIREMENT, requirement}
}

export function clearTempRequirement() {
    return {type: CLEAR_TEMP_REQUIREMENT}
}

function retrievedRequirement(requirement) {
    return {type: GET_REQUIREMENT_BY_ID, requirement}
}

function setStories(stories) {
    return {type: SET_STORIES, stories}
}

export function getRequirementById(id) {
    return dispatch => {
        StaticLoad.show("getRequirementById");
        post(url.getRequirementById, {
            "reqmntId": id,
            "staffId": getStaffId()
        })
            .then((res) => {
                StaticLoad.remove("getRequirementById");
                const requirement = convertRequirementToLocal(res.responseBody);
                requirement.authCode = res.responseBody.staffAuthInfo;
                /*if (res.responseBody.staffAuthInfo && res.responseBody.staffAuthInfo.length > 0) {
                    res.responseBody.staffAuthInfo.map((auth) => {
                        requirement.authCode.push(auth.authCode)
                    })
                }*/
                dispatch(retrievedRequirement(requirement));
                dispatch(setRoles(requirement.roles));
                dispatch(setStories(requirement.stories));
            })
            .catch((error) => {
                StaticLoad.remove("getRequirementById");
                StaticDialog.show("getRequirementById-error", error.responseCode, error.message);
                dispatch(retrievedRequirement({}));
                dispatch(setRoles([]));
                dispatch(setStories());
            });
    }
}

export function updateRequirementBasic(basicInfo, callback) {
    return dispatch => {
        const params = convertReqBasicToServer(basicInfo);
        StaticLoad.show("updateReqBasic");
        post(url.updateReqmntInfo, params)
            .then((res) => {
                StaticLoad.remove("updateReqBasic");
                const requirement = convertReqBasicToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqBasic");
                StaticDialog.show("updateReqBasic-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateRequirementAdditional(additionalInfo, callback) {
    return dispatch => {
        const params = convertReqAdditionalToServer(additionalInfo);
        StaticLoad.show("updateReqAdditional");
        post(url.updateReqmntInfo, params)
            .then((res) => {
                StaticLoad.remove("updateReqAdditional");
                const requirement = convertReqAdditionalToLocal(res.responseBody);
                requirement.authCode = res.responseBody.staffAuthInfo;
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqAdditional");
                StaticDialog.show("updateReqAdditional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateRequirementOptional(optionalInfo, callback) {
    return dispatch => {
        const params = convertReqOptionalToServer(optionalInfo);
        StaticLoad.show("updateReqOptional");
        post(url.updateReqmntInfo, params)
            .then((res) => {
                StaticLoad.remove("updateReqOptional");
                const requirement = convertReqOptionalToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqOptional");
                StaticDialog.show("updateReqOptional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateRequirementStatus(statusInfo) {
    return dispatch => {
        const params = convertReqStatusToServer(statusInfo);
        StaticLoad.show("updateReqStatus");
        post(url.updateReqmntInfo, params)
            .then((res) => {
                StaticLoad.remove("updateReqStatus");
                const requirement = convertReqStatusToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
            })
            .catch((error) => {
                StaticLoad.remove("updateReqStatus");
                StaticDialog.show("updateReqStatus-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}


export function createRequirementComment(requirement, comment, callback) {
    return dispatch => {
        const params = convertReqCommentToServer(requirement, comment);
        post(url.createComment, params)
            .then((res) => {
                if (!requirement.comments) requirement.comments = [];
                const comment = convertCommentToLocal(res.responseBody);
                requirement.comments.push(comment);
                dispatch(updateRequirement(requirement));
                callback && callback();
            })
            .catch((error) => {
                StaticDialog.show("createRequirementComment-error", error.responseCode, error.message);
            });
    }
}

export function voteRequirementComment(requirement, comment, action) {
    return dispatch => {
        const params = {
            commentId: comment.commentId,
            remark: action === "upVote" ? "like" : "dislike",
            creatorId: getStaffId()
        };
        post(url.voteComment, params)
            .then((res) => {
                const comment = convertCommentToLocal(res.responseBody);
                requirement.comments.some((item) => {
                    if (item.commentId === comment.commentId) {
                        Object.assign(item, comment);
                        return true;
                    }
                });
                dispatch(updateRequirement(requirement));
            })
            .catch((error) => {
                StaticDialog.show("voteRequirementComment-error", error.responseCode, error.message);
            });
    }
}