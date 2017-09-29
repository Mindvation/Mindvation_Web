import {post} from '../util/request';
import StaticLoad from '../components/common/Loading';
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
    return {type: LOG_OUT}
}

export function logon(user) {
    return dispatch => {
        StaticLoad.show("d");
        let timer = setTimeout(() => {
            const res = {
                'responseCode': '000'
            };
            dispatch(logonSuccess(res));
            StaticLoad.remove("d");
            timer && clearTimeout(timer);
        }, 2000);
        /*post('http://192.168.0.103:8081/sports-meetup-papi/users/login', user)
            .then((res) => {
                if (res) {
                    dispatch(logonSuccess(res))
                } else {
                    console.info('登录失败，账号或密码错误');
                }
            });*/
        /*const res = {
            'responseCode': '000'
        };
        dispatch(logonSuccess(res))*/
    }
}