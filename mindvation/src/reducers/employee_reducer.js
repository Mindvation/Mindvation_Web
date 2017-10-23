import {GET_EMPLOYEE_LIST, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE} from '../actions/employee_action';

function employee(state = {
    employees: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_EMPLOYEE_LIST:
            return action.employees;
        case CREATE_EMPLOYEE:
            let temp = {...state};
            temp.employees.push(action.employee);
            return temp;
        case UPDATE_EMPLOYEE:
            let temp2 = {...state};
            temp2.employees.some((employee) => {
                if (employee.key === action.employee.key) {
                    Object.assign(employee, action.employee);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_EMPLOYEE:
            let temp3 = {...state};
            temp3.employees.splice(temp3.employees.indexOf(action.employee), 1);
            return temp3;
        default:
            return state
    }
}

export default employee;