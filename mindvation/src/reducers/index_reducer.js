import {combineReducers} from 'redux';
import project from './projects_reducer';

const mindvationApp = combineReducers({
    project
});

export default mindvationApp;