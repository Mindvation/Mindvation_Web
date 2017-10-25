import {GET_DEPARTMENT_LIST, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT} from '../actions/department_action';

function department(state = {
    departments: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_DEPARTMENT_LIST:
            return action.departments;
        case CREATE_DEPARTMENT:
            let temp = {...state};
            temp.departments.push(action.department);
            return temp;
        case UPDATE_DEPARTMENT:
            let temp2 = {...state};
            temp2.departments.some((department) => {
                if (department.key === action.department.key) {
                    Object.assign(department, action.department);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_DEPARTMENT:
            let temp3 = {...state};
            temp3.departments.splice(temp3.departments.indexOf(action.department), 1);
            return temp3;
        default:
            return state
    }
}

export default department;