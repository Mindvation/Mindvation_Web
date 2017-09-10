/*
 * action 类型
 */

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
        fetch('/stub/getMembersByTags.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(retrievedMembers(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}


export function clearTempMembers() {
    return {type: CLEAR_TEMP_MEMBERS}
}

