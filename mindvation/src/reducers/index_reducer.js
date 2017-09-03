import {combineReducers} from 'redux';
import projects from './projects_reducer';
import project from './project_reducer';
import userInfo from './logon_reducer';
import task from './task_reducer';
import member from './member_reducer';
import requirement from './requirement_reducer';
import requirements from './requirements_reducer';
import role from './role_reducer';

const mindvationApp = combineReducers({
    projects,
    userInfo,
    task,
    project,
    member,
    requirement,
    requirements,
    role
});

export default mindvationApp;