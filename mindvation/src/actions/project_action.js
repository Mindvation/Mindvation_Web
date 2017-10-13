/*
 * action 类型
 */
import {post} from '../util/request';
import {
    convertProjectToLocal,
    convertProjectBasicToServer,
    convertProjectBasicToLocal,
    convertProjectAdditionalToServer,
    convertProjectAdditionalToLocal,
    convertProjectOptionalToServer,
    convertProjectOptionalToLocal,
    convertProjectStatusToServer,
    convertProjectStatusToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';

export const GET_PROJECT_BY_ID = 'GET_PROJECT_BY_ID';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const SET_REQUIREMENT = 'SET_REQUIREMENT';

/*
 * action 创建函数
 */
function retrievedProject(project) {
    return {type: GET_PROJECT_BY_ID, project}
}

function setRequirement(requirements) {
    return {type: SET_REQUIREMENT, requirements}
}

export function getProjectById(id) {
    return dispatch => {
        post('10006/mdvn-project-papi/project/rtrvProjectInfo', {
            "projId": id
        })
            .then((res) => {
                const project = convertProjectToLocal(res.responseBody.projectDetail);
                dispatch(retrievedProject(project));
                //dispatch(setRequirement(data.requirements));
            })
            .catch((error) => {
                dispatch(retrievedProject({}));
            });
    }
}

export function updateProject(updatedInfo) {
    return {type: UPDATE_PROJECT, updatedInfo}
}

export function updateProjectBasic(basicInfo, callback) {
    return dispatch => {
        const params = convertProjectBasicToServer(basicInfo);
        StaticLoad.show("updateProBasic");
        post('10006/mdvn-project-papi/project/updateProject', params)
            .then((res) => {
                StaticLoad.remove("updateProBasic");
                const project = convertProjectBasicToLocal(res.responseBody.projectDetail);
                dispatch(updateProject(project));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProBasic");
                StaticDialog.show("updateProBasic-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateProjectAdditional(additionalInfo, callback) {
    return dispatch => {
        const params = convertProjectAdditionalToServer(additionalInfo);
        StaticLoad.show("updateProAdditional");
        post('10006/mdvn-project-papi/project/updateProject', params)
            .then((res) => {
                StaticLoad.remove("updateProAdditional");
                const project = convertProjectAdditionalToLocal(res.responseBody.projectDetail);
                dispatch(updateProject(project));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProAdditional");
                StaticDialog.show("updateProAdditional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateProjectOptional(optionalInfo, callback) {
    return dispatch => {
        const params = convertProjectOptionalToServer(optionalInfo);
        StaticLoad.show("updateProOptional");
        post('10006/mdvn-project-papi/project/updateProject', params)
            .then((res) => {
                StaticLoad.remove("updateProOptional");
                const project = convertProjectOptionalToLocal(res.responseBody.projectDetail);
                dispatch(updateProject(project));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProOptional");
                StaticDialog.show("updateProOptional-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function updateProjectStatus(statusInfo) {
    return dispatch => {
        const params = convertProjectStatusToServer(statusInfo);
        StaticLoad.show("updateProStatus");
        post('10006/mdvn-project-papi/project/updateProject', params)
            .then((res) => {
                StaticLoad.remove("updateProStatus");
                const project = convertProjectStatusToLocal(res.responseBody.projectDetail);
                dispatch(updateProject(project));
            })
            .catch((error) => {
                StaticLoad.remove("updateProStatus");
                StaticDialog.show("updateProStatus-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}