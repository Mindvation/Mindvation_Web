/*
 * action 类型
 */
import {post} from '../util/request';
import {url} from '../util/ServiceUrl';
import StaticDialog from '../components/common/Dialog';
import StaticLoad from '../components/common/Loading';
import {
    convertIssuesToLocal,
    convertAnswerToLocal,
    convertAnswerJudgementToLocal,
    convertAnswerCommentToServer,
    convertCommentToLocal
} from '../util/Convert';
import {getStaffId} from '../util/UserStore';

export const SET_ISSUES = 'SET_ISSUES';
export const SET_ISSUE_ANSWER = 'SET_ISSUE_ANSWER';
export const UPDATE_ISSUE_ANSWER = 'UPDATE_ISSUE_ANSWER';

/*
 * action 创建函数
 */
function setIssues(issues) {
    return {type: SET_ISSUES, issues}
}

function setIssueAnswer(answer) {
    return {type: SET_ISSUE_ANSWER, answer}
}

function updateAnswer(answer) {
    return {type: UPDATE_ISSUE_ANSWER, answer}
}

export function getIssueList(subject, issueId) {
    return dispatch => {
        post(url.getIssueList, {
            projId: subject.projectId,
            issueId: issueId,
            subjectId: subject.id
        })
            .then((res) => {
                let issues = convertIssuesToLocal(res.responseBody);
                dispatch(setIssues(issues));
            })
            .catch((error) => {
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

export function createIssue(subject, issue, callback) {
    StaticLoad.show("createIssue");
    return dispatch => {
        post(url.createIssue, {
            projId: subject.projectId,
            subjectId: subject.id,
            creatorId: getStaffId(),
            content: issue.description,
            reward: issue.reward,
            tagId: issue.tag[0] ? issue.tag[0].tagId : ''
        })
            .then((res) => {
                StaticLoad.remove("createIssue");
                let issues = convertIssuesToLocal(res.responseBody);
                dispatch(setIssues(issues));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createIssue");
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

export function answerIssue(question, answer, callback) {
    return dispatch => {
        post(url.answerIssue, {
            projId: question.projectId,
            issueId: question.issueId,
            creatorId: getStaffId(),
            content: answer.text
        })
            .then((res) => {
                let resAnswer = convertAnswerToLocal(res.responseBody);
                dispatch(setIssueAnswer(resAnswer));
                callback();
            })
            .catch((error) => {
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

export function updateAnswerJudgement(answer) {
    return dispatch => {
        post(url.judgeAnswer, {
                answerId: answer.answerId,
                remark: answer.action,
                creatorId: getStaffId()
            }
        )
            .then((res) => {
                let resAnswer = convertAnswerJudgementToLocal(res.responseBody);
                dispatch(updateAnswer(resAnswer));
            })
            .catch((error) => {
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

export function adoptAnswer(question, answer) {
    return dispatch => {
        post(url.adoptAnswer, {
                creatorId: getStaffId(),
                answerId: answer.answerId,
                issueId: question.issueId
            }
        )
            .then((res) => {
                let issues = convertIssuesToLocal(res.responseBody);
                dispatch(setIssues(issues));
            })
            .catch((error) => {
                StaticDialog.show("createRequirement-error", error.responseCode, error.message);
            });
    }
}

export function createAnswerComment(question, answer, comment, callback) {
    return dispatch => {
        const params = convertAnswerCommentToServer(question, answer, comment);
        post(url.createComment, params)
            .then((res) => {
                const comment = convertCommentToLocal(res.responseBody);
                answer.comments.push(comment);
                dispatch(updateAnswer(answer));
                callback && callback();
            })
            .catch((error) => {
                StaticDialog.show("createAnswerComment-error", error.responseCode, error.message);
            });
    }
}

export function voteAnswerComment(answer, comment, action) {
    return dispatch => {
        const params = {
            commentId: comment.commentId,
            remark: action === "upVote" ? "like" : "dislike",
            creatorId: getStaffId()
        };
        post(url.voteComment, params)
            .then((res) => {
                const comment = convertCommentToLocal(res.responseBody);
                answer.comments.some((item) => {
                    if (item.commentId === comment.commentId) {
                        Object.assign(item, comment);
                        return true;
                    }
                });
                dispatch(updateAnswer(answer));
            })
            .catch((error) => {
                StaticDialog.show("voteAnswerComment-error", error.responseCode, error.message);
            });
    }
}