import {combineReducers} from 'redux';
import projects from './projects_reducer';
import project from './project_reducer';
import userInfo from './logon_reducer';
import checklist from './checklist_reducer';

const mindvationApp = combineReducers({
    projects,
    userInfo,
    checklist,
    project
});

export default mindvationApp;