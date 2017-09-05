/*
 * action 类型
 */

export const GET_COMMENTS_BY_TYPE = 'GET_COMMENTS_BY_TYPE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

/*
 * action 创建函数
 */
function retrievedComments(comments) {
    return {type: GET_COMMENTS_BY_TYPE, comments}
}

export function getCommentsByType(type) {
    return dispatch => {
        fetch('../stub/getCommentsByType.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(retrievedComments(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}


export function updateComment(comment) {
    return {type: UPDATE_COMMENT, comment}
}

export function addComment(comment) {
    return {type: ADD_COMMENT, comment}
}

