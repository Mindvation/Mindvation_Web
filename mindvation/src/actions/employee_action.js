/*
 * action 类型
 */
import {post} from '../util/request';
import {} from '../util/Convert';
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

export function getEmployeeList(employees) {
    return dispatch => {
        fetch('/stub/getEmployeeList.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(retrievedEmployeeList(data));
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}

export function createEmployee(employee) {
    return {type: CREATE_EMPLOYEE, employee}
}

export function updateEmployee(employee) {
    return {type: UPDATE_EMPLOYEE, employee}
}

export function deleteEmployee(employee) {
    return {type: DELETE_EMPLOYEE, employee}
}