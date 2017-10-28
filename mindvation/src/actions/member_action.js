/*
 * action 类型
 */
import {url} from '../util/ServiceUrl';
import {post} from '../util/request';
import {convertMemberToLocal} from '../util/Convert';

export const SEARCH_MEMBERS_BY_TAGS = 'SEARCH_MEMBERS_BY_TAGS';
export const CLEAR_TEMP_MEMBERS = 'CLEAR_TEMP_MEMBERS';

/*
 * action 创建函数
 */
function retrievedMembers(members) {
    return {type: SEARCH_MEMBERS_BY_TAGS, members}
}

export function searchMembersByTags(tags) {
    return dispatch => {
        post(url.retrieveStaff, {})
            .then((res) => {
                const members = convertMemberToLocal(res.responseBody);
                dispatch(retrievedMembers(members));
            })
            .catch((error) => {
                console.info(error);
                dispatch(retrievedMembers([]));
            });
    }
}


export function clearTempMembers() {
    return {type: CLEAR_TEMP_MEMBERS}
}

