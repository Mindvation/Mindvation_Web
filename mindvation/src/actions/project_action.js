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
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';
import {retrieveRequirements} from './requirements_action';

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
        StaticLoad.show("getProjectById");
        post(url.getProjectById, {
            criterion: id,
            staffId: getStaffId()
        })
            .then((res) => {
                StaticLoad.remove("getProjectById");
                const project = convertProjectToLocal(res.data);
                project.authCode = res.data.staffAuthInfo;
                /*if (res.responseBody.staffAuthInfo && res.responseBody.staffAuthInfo.length > 0) {
                    res.responseBody.staffAuthInfo.map((auth) => {
                        project.authCode.push(auth.authCode)
                    })
                }*/
                dispatch(retrievedProject(project));
                dispatch(retrieveRequirements(1, 10, id));
            })
            .catch((error) => {
                StaticLoad.remove("getProjectById");
                StaticDialog.show("getProjectById-error", error.code, error.msg);
                dispatch(retrievedProject({}));
                //dispatch(setRequirement());
            });
    }
}

export function updateProject(updatedInfo) {
    return {type: UPDATE_PROJECT, updatedInfo}
}

export function updateProjectBasic(projectInfo, basicInfo, callback) {
    return dispatch => {
        const params = convertProjectBasicToServer(projectInfo, basicInfo);
        if (!params) {
            callback();
            return;
        }
        StaticLoad.show("updateProBasic");
        post(url.updateProjectBasicInfo, params)
            .then(() => {
                StaticLoad.remove("updateProBasic");
                //const project = convertProjectBasicToLocal(basicInfo);
                dispatch(updateProject(basicInfo));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProBasic");
                StaticDialog.show("updateProBasic-error", error.code, error.msg);
                console.info(error);
            });
    }
}

export function updateProjectAdditional(projectInfo, additionalInfo, callback) {
    return dispatch => {
        const params = convertProjectAdditionalToServer(projectInfo, additionalInfo);
        if (!params) {
            callback();
            return;
        }
        StaticLoad.show("updateProAdditional");
        post(url.updateProjectOtherInfo, params)
            .then(() => {
                StaticLoad.remove("updateProAdditional");
                // const project = convertProjectAdditionalToLocal(res.responseBody.projectDetail);
                //project.authCode = res.data.staffAuthInfo;
                dispatch(updateProject(additionalInfo));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProAdditional");
                StaticDialog.show("updateProAdditional-error", error.code, error.msg);
                console.info(error);
            });
    }
}

export function updateProjectOptional(optionalInfo, callback) {
    return dispatch => {
        const params = convertProjectOptionalToServer(optionalInfo);
        StaticLoad.show("updateProOptional");
        post(url.updateProject, params)
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
        post(url.updateProject, params)
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