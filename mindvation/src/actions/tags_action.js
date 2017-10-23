/*
 * action 类型
 */
import {post} from '../util/request';
import {url} from '../util/ServiceUrl';

export const CREATED_TAG = 'CREATE_TAGS';
export const RETRIEVED_TAGS = 'RETRIEVE_TAGS';


/*
 * action 创建函数
 */

function createdTag(tag) {
    return {type: CREATED_TAG, tag}
}

function retrievedTags(tags) {
    return {type: RETRIEVED_TAGS, tags}
}

export function createTag(tag, callback) {
    return dispatch => {
        post(url.createTag, tag)
            .then((res) => {
                dispatch(createdTag(res.responseBody));
                callback && callback(res.responseBody);
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

export function retrieveTags(page, pageSize) {
    return dispatch => {
        const params = {
            "page": page,
            "pageSize": pageSize
        };

        post(url.retrieveTags, {})
            .then((res) => {
                dispatch(retrievedTags(res.responseBody.tags))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}