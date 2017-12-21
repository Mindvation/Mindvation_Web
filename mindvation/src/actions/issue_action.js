/*
 * action 类型
 */

export const SET_ISSUES = 'SET_ISSUES';

/*
 * action 创建函数
 */
export function setIssues(issues) {
    return {type: SET_ISSUES, issues}
}

export function getIssueList() {
    return dispatch => {
        fetch('/stub/getIssueList.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(setIssues(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}
