/*
 * action 类型
 */
import {post} from '../util/request';
import {convertProjectToServer} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {getStaffId} from '../util/UserStore';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const RETRIEVED_PROJECTS = 'RETRIEVE_PROJECTS';


/*
 * action 创建函数
 */

function createdProject(project) {
    return {type: CREATE_PROJECT, project}
}

function retrievedProjects(projects) {
    return {type: RETRIEVED_PROJECTS, projects}
}

export function createProject(project, callback) {
    return dispatch => {
        const params = convertProjectToServer(project);
        StaticLoad.show("createProject");
        post(url.createProject, params)
            .then((res) => {
                StaticLoad.remove("createProject");
                dispatch(createdProject(res.responseBody));
                callback(res.responseBody.projId);
            })
            .catch((error) => {
                StaticLoad.remove("createProject");
                StaticDialog.show("createProject-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function retrieveProjects(page, pageSize) {
    return dispatch => {
        const params = {
            "staffId": getStaffId(),
            "page": page,
            "pageSize": pageSize
        };

        post(url.retrieveProjects, params)
            .then((res) => {
                dispatch(retrievedProjects(res.responseBody))
            })
            .catch((error) => {
                console.info(error);
            });
    }
}