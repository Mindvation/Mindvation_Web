/*
 * action 类型
 */
import {post} from '../util/request';
import {
    convertRequirementToServer,
    convertReqCommentToServer,
    convertCommentToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const CREATED_REQUIREMENT = 'CREATED_REQUIREMENT';
export const UPDATE_REQUIREMENTS = 'UPDATE_REQUIREMENTS';
export const RETRIEVED_REQUIREMENTS = 'RETRIEVED_REQUIREMENTS';

/*
 * action 创建函数
 */

function createdRequirement(requirement) {
    return {type: CREATED_REQUIREMENT, requirement}
}

export function createRequirement(requirement, callback) {
    return dispatch => {
        const params = convertRequirementToServer(requirement);
        StaticLoad.show("createRequirement");
        post(url.createRequirement, params)
            .then((res) => {
                StaticLoad.remove("createRequirement");
                dispatch(createdRequirement(res.responseBody));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createRequirement");
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

function retrievedRequirements(requirements) {
    return {type: RETRIEVED_REQUIREMENTS, requirements}
}

export function retrieveRequirements(page, pageSize, projectId) {
    return dispatch => {
        const params = {
            "projId": projectId,
            "staffId": getStaffId(),
            "page": page,
            "pageSize": pageSize
        };

        post(url.retrieveRequirements, params)
            .then((res) => {
                dispatch(retrievedRequirements(res.responseBody))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

export function updateRequirements(requirement) {
    return {type: UPDATE_REQUIREMENTS, requirement}
}

export function createRequirementComment(requirement, comment, callback) {
    return dispatch => {
        const params = convertReqCommentToServer(requirement, comment);
        post(url.createComment, params)
            .then((res) => {
                if (!requirement.comments) requirement.comments = [];
                const comment = convertCommentToLocal(res.responseBody);
                requirement.comments.push(comment);
                dispatch(updateRequirements(requirement));
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
                dispatch(updateRequirements(requirement));
            })
            .catch((error) => {
                StaticDialog.show("voteRequirementComment-error", error.responseCode, error.message);
            });
    }
}