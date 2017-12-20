/*
 * action 类型
 */

export const SET_REWARDS = 'SET_REWARDS';

/*
 * action 创建函数
 */
export function setRewards(rewards) {
    return {type: SET_REWARDS, rewards}
}

export function getRewardList() {
    return dispatch => {
        fetch('/stub/getRewardList.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(setRewards(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}
