/*
 * action 类型
 */
import {post} from '../util/request';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const GET_INFORMATION_LIST = 'CREATED_REQUIREMENT';
export const REMOVE_INFORMATION = 'UPDATE_REQUIREMENTS';

/*
 * action 创建函数
 */

function setInformation(information) {
    return {type: GET_INFORMATION_LIST, information}
}

export function getInformationList(page, pageSize) {
    return dispatch => {
        const params = {
            "staffId": getStaffId(),
            "page": page,
            "pageSize": pageSize
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