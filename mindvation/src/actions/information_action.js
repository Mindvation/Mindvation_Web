/*
 * action 类型
 */
import {post} from '../util/request';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const GET_INFORMATION_LIST = 'GET_INFORMATION_LIST';
export const REMOVE_INFORMATION = 'REMOVE_INFORMATION';

/*
 * action 创建函数
 */

function setInformation(information) {
    return {type: GET_INFORMATION_LIST, information}
}

export function getInformationList(startNum, size) {
    return dispatch => {
        const params = {
            "recipientId": getStaffId(),
            "startNum": startNum,
            "size": size
        };

        post(url.getInformationList, params)
            .then((res) => {
                dispatch(setInformation(res.responseBody))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

export function removeInfomation(info) {
    return {type: REMOVE_INFORMATION, info}
}