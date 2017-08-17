import {combineReducers} from 'redux';
import project from './projects_reducer';
import userInfo from './logon_reducer';

const mindvationApp = combineReducers({
    project,
    userInfo
});

export default mindvationApp;