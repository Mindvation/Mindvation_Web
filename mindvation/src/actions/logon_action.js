import {post} from '../util/request';
import StaticLoad from '../components/common/Loading';
import {url} from '../util/ServiceUrl';
import {setUser, removeUser} from '../util/UserStore';
/*
 * action 类型
 */

export const LOGON_SUCCESS = 'LOGON_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

/*
 * action 创建函数
 */

function logonSuccess(userInfo) {
    return {type: LOGON_SUCCESS, userInfo}
}

export function logOut() {
    removeUser();
    return {type: LOG_OUT}
}

export function logon(user, callback) {
    return dispatch => {
        StaticLoad.show("logon");
        post(url.login, user)
            .then((res) => {
                dispatch(logonSuccess(res));
                setUser(res.responseBody);
                StaticLoad.remove("logon");
                callback();
            })
            .catch((error) => {
                dispatch(logonSuccess(error));
                StaticLoad.remove("logon");
            });
    }
}