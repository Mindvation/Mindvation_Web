/*
 * action 类型
 */
import {post} from '../util/request';
import {convertProjectToServer} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';

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
        post('10006/mdvn-project-papi/project/createProject', params)
            .then((res) => {
                StaticLoad.remove("createProject");
                dispatch(createdProject(res.responseBody));
                callback();
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
            "staffId": "m2",
            "page": page,
            "pageSize": pageSize
        };

        post('10006/mdvn-project-papi/project/rtrvProjInfoList', params)
            .then((res) => {
                dispatch(retrievedProjects(res.responseBody))
            })
            .catch((error) => {
                console.info(error);
            });
        ;
    }
}