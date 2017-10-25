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

export function getDepartmentList(departments) {
    return dispatch => {
        fetch('/stub/getDepartmentList.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(retrievedDepartmentList(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}

export function createDepartment(department) {
    return {type: CREATE_DEPARTMENT, department}
}

export function updateDepartment(department) {
    return {type: UPDATE_DEPARTMENT, department}
}

export function deleteDepartment(department) {
    return {type: DELETE_DEPARTMENT, department}
}