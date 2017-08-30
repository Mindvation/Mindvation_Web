import {combineReducers} from 'redux';
import projects from './projects_reducer';
import project from './project_reducer';
import userInfo from './logon_reducer';
import task from './task_reducer';

const mindvationApp = combineReducers({
    projects,
    userInfo,
    task,
    project
});

export default mindvationApp;