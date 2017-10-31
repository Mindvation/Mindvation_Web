/*
 * action 类型
 */
import {post} from '../util/request';
import {} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_DEPARTMENT_LIST = 'GET_DEPARTMENT_LIST';
export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT';
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';

/*
 * action 创建函数
 */

function retrievedDepartmentList(departments) {
    return {type: GET_DEPARTMENT_LIST, departments}
}

export function getDepartmentList(page, pageSize) {
    return dispatch => {
        post(url.rtrvDepartmentList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedDepartmentList({
                    departments: res.responseBody.departmentList,
                    totalElements: res.responseBody.totalPage
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

export function createdDepartment(department) {
    return {type: CREATE_DEPARTMENT, department}
}

export function createDepartment(department, callback) {
    return dispatch => {
        StaticLoad.show("createDepartment");
        post(url.createDepartment, department)
            .then((res) => {
                StaticLoad.remove("createDepartment");
                dispatch(createdDepartment(res.responseBody));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createDepartment");
                StaticDialog.show("createDepartment-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedDepartment(department) {
    return {type: UPDATE_DEPARTMENT, department}
}

export function updateDepartment(department, callback) {
    return dispatch => {
        StaticLoad.show("updateDepartment");
        post(url.updateDepartment, department)
            .then((res) => {
                StaticLoad.remove("updateDepartment");
                dispatch(updatedDepartment(res.responseBody));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateDepartment");
                StaticDialog.show("updateDepartment-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function deletedDepartment(department) {
    return {type: DELETE_DEPARTMENT, department}
}

export function deleteDepartment(department) {
    return dispatch => {
        StaticLoad.show("deleteDepartment");
        post(url.deleteDepartment, {
            departmentId: department.id
        })
            .then(() => {
                StaticLoad.remove("deleteDepartment");
                dispatch(deletedDepartment(department));
            })
            .catch((error) => {
                StaticLoad.remove("deleteDepartment");
                StaticDialog.show("deleteDepartment-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}