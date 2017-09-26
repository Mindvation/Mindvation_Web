import {combineReducers} from 'redux';
import projects from './projects_reducer';
import project from './project_reducer';
import userInfo from './logon_reducer';
import task from './task_reducer';
import member from './member_reducer';
import requirement from './requirement_reducer';
import requirements from './requirements_reducer';
import role from './role_reducer';
import stories from './stories_reducer';
import story from './story_reducer';
import checklist from './checklist_reducer';

const mindvationApp = combineReducers({
    projects,
    userInfo,
    task,
    project,
    member,
    requirement,
    requirements,
    role,
    stories,
    story,
    checklist
});

export default mindvationApp;