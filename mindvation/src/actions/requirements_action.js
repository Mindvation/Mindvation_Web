/*
 * action 类型
 */
import {post} from '../util/request';
import {
    convertRequirementToServer
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const CREATED_REQUIREMENT = 'CREATED_REQUIREMENT';
export const UPDATE_REQUIREMENTS = 'UPDATE_REQUIREMENTS';
export const RETRIEVED_REQUIREMENTS = 'RETRIEVED_REQUIREMENTS';

/*
 * action 创建函数
 */

function createdRequirement(requirement) {
    return {type: CREATED_REQUIREMENT, requirement}
}

export function createRequirement(requirement, callback) {
    return dispatch => {
        const params = convertRequirementToServer(requirement);
        StaticLoad.show("createRequirement");
        post(url.createRequirement, params)
            .then((res) => {
                StaticLoad.remove("createRequirement");
                dispatch(createdRequirement(res.data));
                callback(res.data.serialNo);
            })
            .catch((error) => {
                StaticLoad.remove("createRequirement");
                StaticDialog.show("createRequirement-error", error.code, error.msg);
            });
    }
}

function retrievedRequirements(requirements) {
    return {type: RETRIEVED_REQUIREMENTS, requirements}
}

export function retrieveRequirements(page, pageSize, projectId) {
    return dispatch => {
        const params = {
            staffId: getStaffId(),
            criterion: projectId,
            pageableCriteria: {
                page: page,
                size: pageSize
            }
        };

        post(url.retrieveRequirements, params)
            .then((res) => {
                dispatch(retrievedRequirements({
                    requirementInfos: res.data.content,
                    totalElements: res.data.totalElements
                }))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

export function updateRequirements(requirement) {
    return {type: UPDATE_REQUIREMENTS, requirement}
}