import {post} from '../util/request';
/*
 * action 类型
 */

export const LOGON_SUCCESS = 'LOGON_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

/*
 * action 创建函数
 */

export function logonSuccess(userInfo) {
    return {type: LOGON_SUCCESS, userInfo}
}

export function logOut() {
    return {type: LOG_OUT}
}

export function logon(user) {
    return dispatch => {
        post('http://192.168.0.105:8081/sports-meetup-papi/users/login', user)
            .then((res) => {
                if (res) {
                    dispatch(logonSuccess(res))
                } else {
                    console.info('登录失败，账号或密码错误');
                }
            });
    }
}