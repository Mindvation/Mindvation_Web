import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {setUser, removeUser} from '../util/UserStore';
/*
 * action 类型
 */

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

/*
 * action 创建函数
 */

function setUserInfo(userInfo) {
    setUser(userInfo);
    return {type: SET_USER, userInfo}
}

export function logOut() {
    removeUser();
    return {type: REMOVE_USER}
}

export function logon(user, callback) {
    return dispatch => {
        StaticLoad.show("logon");
        post(url.login, user)
            .then((res) => {
                dispatch(setUserInfo({staffInfo: res.responseBody}));
                StaticLoad.remove("logon");
                callback();
            })
            .catch((error) => {
                dispatch(setUserInfo(error));
                StaticLoad.remove("logon");
            });
    }
}

export function updateUser(params) {
    return dispatch => {
        StaticLoad.show("updateUser");
        post(url.updateStaffDetail, params)
            .then((res) => {
                StaticLoad.remove("updateUser");
                dispatch(setUserInfo(res.responseBody))
            })
            .catch((error) => {
                StaticLoad.remove("updateUser");
                StaticDialog.show("updateUser-error", error.responseCode, error.message);
            });
    }
}

export function getUserInfo(staffId) {
    return dispatch => {
        StaticLoad.show("getUserInfo");
        get(url.rtrvStaffDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("getUserInfo");
                dispatch(setUserInfo(res.responseBody))
            })
            .catch((error) => {
                StaticLoad.remove("getUserInfo");
                StaticDialog.show("getUserInfo-error", error.responseCode, error.message);
            });
    }
}

export function changePassword(params, callback) {
    return dispatch => {
        StaticLoad.show("changePassword");
        post(url.changePassword, params)
            .then(() => {
                StaticLoad.remove("changePassword");
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("changePassword");
                StaticDialog.show("changePassword-error", error.responseCode, error.message);
            });
    }
}