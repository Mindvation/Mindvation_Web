import {combineReducers} from 'redux';
import project from './projects_reducer';
import userInfo from './logon_reducer';
import checklist from './checklist_reducer';

const mindvationApp = combineReducers({
    project,
    userInfo,
    checklist
});

export default mindvationApp;