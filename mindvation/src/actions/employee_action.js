/*
 * action 类型
 */
import {post, get} from '../util/request';
import {
    convertEmployeeToServer,
    convertEmployeeToLocal,
    convertEditEmployeeToServer
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

/*
 * action 创建函数
 */

function retrievedEmployeeList(employees) {
    return {type: GET_EMPLOYEE_LIST, employees}
}

export function getEmployeeList(page, pageSize) {
    return dispatch => {
        post(url.retrieveStaff, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedEmployeeList({
                    employees: res.responseBody.staffs,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdEmployee(employee) {
    return {type: CREATE_EMPLOYEE, employee}
}

export function createEmployee(employee, callback) {
    return dispatch => {
        const params = convertEmployeeToServer(employee);
        StaticLoad.show("createEmployee");
        post(url.createStaff, params)
            .then((res) => {
                StaticLoad.remove("createEmployee");
                dispatch(createdEmployee(res.responseBody));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createEmployee");
                StaticDialog.show("createEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvStaffDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvStaffDetail");
        get(url.rtrvStaffDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvStaffDetail");
                const employee = convertEmployeeToLocal(res.responseBody);
                callback(employee);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvStaffDetail");
                StaticDialog.show("rtrvStaffDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedEmployee(employee) {
    return {type: UPDATE_EMPLOYEE, employee}
}

export function updateEmployee(employee, callback) {
    return dispatch => {
        const params = convertEditEmployeeToServer(employee);
        StaticLoad.show("updateEmployee");
        post(url.updateStaffDetail, params)
            .then((res) => {
                StaticLoad.remove("updateEmployee");
                dispatch(updatedEmployee(res.responseBody.staffInfo));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateEmployee");
                StaticDialog.show("updateEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedEmployee(employee) {
    return {type: DELETE_EMPLOYEE, employee}
}

export function deleteEmployee(employee) {
    return dispatch => {
        StaticLoad.show("deleteEmployee");
        get(url.deleteStaff, {
            staffId: employee.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteEmployee");
                dispatch(deletedEmployee(employee));
            })
            .catch((error) => {
                StaticLoad.remove("deleteEmployee");
                StaticDialog.show("deleteEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}