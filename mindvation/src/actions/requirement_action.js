/*
 * action 类型
 */
import {post} from '../util/request';
import {setRoles} from './role_action';
import {
    convertRequirementToLocal,
    convertReqBasicToServer,
    convertReqBasicToLocal,
    convertReqOptionalToServer,
    convertReqOptionalToLocal,
    convertReqAdditionalToServer,
    convertReqAdditionalToLocal,
    convertReqStatusToServer,
    convertReqStatusToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';

export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CLEAR_TEMP_REQUIREMENT = 'CLEAR_TEMP_REQUIREMENT';
export const GET_REQUIREMENT_BY_ID = 'GET_REQUIREMENT_BY_ID';
export const SET_STORIES = 'SET_STORIES';

/*
 * action 创建函数
 */

export function updateRequirement(requirement) {
    return {type: UPDATE_REQUIREMENT, requirement}
}

export function clearTempRequirement() {
    return {type: CLEAR_TEMP_REQUIREMENT}
}

function retrievedRequirement(requirement) {
    return {type: GET_REQUIREMENT_BY_ID, requirement}
}

function setStories(stories) {
    return {type: SET_STORIES, stories}
}

export function getRequirementById(id) {
    return dispatch => {
        post('8080/mdvn-reqmnt-papi/reqmnts/rtrvReqmntInfo', {
            "reqmntId": id
        })
            .then((res) => {
                const requirement = convertRequirementToLocal(res.responseBody);
                dispatch(retrievedRequirement(requirement));
                dispatch(setRoles(requirement.roles));
                //dispatch(setStories(data.stories));
            })
            .catch((error) => {
                dispatch(retrievedRequirement({}));
            });
    }
}

export function updateRequirementBasic(basicInfo, callback) {
    return dispatch => {
        const params = convertReqBasicToServer(basicInfo);
        StaticLoad.show("updateReqBasic");
        post('8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo', params)
            .then((res) => {
                StaticLoad.remove("updateReqBasic");
                const requirement = convertReqBasicToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqBasic");
                StaticDialog.show("updateReqBasic-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateRequirementAdditional(additionalInfo, callback) {
    return dispatch => {
        const params = convertReqAdditionalToServer(additionalInfo);
        StaticLoad.show("updateReqAdditional");
        post('8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo', params)
            .then((res) => {
                StaticLoad.remove("updateReqAdditional");
                const requirement = convertReqAdditionalToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqAdditional");
                StaticDialog.show("updateReqAdditional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateRequirementOptional(optionalInfo, callback) {
    return dispatch => {
        const params = convertReqOptionalToServer(optionalInfo);
        StaticLoad.show("updateReqOptional");
        post('8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo', params)
            .then((res) => {
                StaticLoad.remove("updateReqOptional");
                const requirement = convertReqOptionalToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateReqOptional");
                StaticDialog.show("updateReqOptional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}


export function updateRequirementStatus(statusInfo) {
    return dispatch => {
        const params = convertReqStatusToServer(statusInfo);
        StaticLoad.show("updateReqStatus");
        post('8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo', params)
            .then((res) => {
                StaticLoad.remove("updateReqStatus");
                const requirement = convertReqStatusToLocal(res.responseBody);
                dispatch(updateRequirement(requirement));
            })
            .catch((error) => {
                StaticLoad.remove("updateReqStatus");
                StaticDialog.show("updateReqStatus-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}