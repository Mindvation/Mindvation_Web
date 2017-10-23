let url;
const isProduction = false;

if (isProduction) {
    url = {
        getRequirementById: '8080/mdvn-reqmnt-papi/reqmnts/rtrvReqmntInfo',
        updateReqmntInfo: '8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo',
        retrieveModels: '8080/mdvn-model-papi/model/rtrvModelList',
        retrieveStaff: '8080/mdvn-staff-papi/staff/rtrvStaffList',
        getModelById: '8080/mdvn-model-papi/model/findById',
        createTag: '8080/mdvn-tag-papi/tag/createTag',
        retrieveTags: '8080/mdvn-tag-papi/tag/rtrvTagList',
        createProject: '8080/mdvn-project-papi/project/createProject',
        retrieveProjects: '8080/mdvn-project-papi/project/rtrvProjInfoList',
        getProjectById: '8080/mdvn-project-papi/project/rtrvProjectInfo',
        updateProject: '8080/mdvn-project-papi/project/updateProject',
        createRequirement: '8080/mdvn-reqmnt-papi/reqmnts/createReqmnt',
        retrieveRequirements: '8080/mdvn-reqmnt-papi/reqmnts/rtrvReqmntList',
        createStory: '8080/mdvn-story-papi/story/createStory',
        getStoryById: '8080/mdvn-story-papi/story/rtrvStoryInfo',
        retrieveStories: '8080/mdvn-story-papi/story/rtrvStoryInfoList',
        updateStory: '8080/mdvn-story-papi/story/updateStory',
        addTask: '8080/mdvn-task-papi/task/createTask',
        updateTask: '8080/mdvn-task-papi/task/updateTask',
        createModel: '8080/mdvn-model-papi/model/createModel'
    };
} else {
    url = {
        getRequirementById: '10011/mdvn-reqmnt-papi/reqmnts/rtrvReqmntInfo',
        updateReqmntInfo: '10011/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo',
        retrieveModels: '10010/mdvn-model-papi/model/rtrvModelList',
        retrieveStaff: '10014/mdvn-staff-papi/staff/rtrvStaffList',
        getModelById: '10010/mdvn-model-papi/model/findById',
        createTag: '10001/mdvn-tag-papi/tag/createTag',
        retrieveTags: '10001/mdvn-tag-papi/tag/rtrvTagList',
        createProject: '10006/mdvn-project-papi/project/createProject',
        retrieveProjects: '10006/mdvn-project-papi/project/rtrvProjInfoList',
        getProjectById: '10006/mdvn-project-papi/project/rtrvProjectInfo',
        updateProject: '10006/mdvn-project-papi/project/updateProject',
        createRequirement: '10011/mdvn-reqmnt-papi/reqmnts/createReqmnt',
        retrieveRequirements: '10011/mdvn-reqmnt-papi/reqmnts/rtrvReqmntList',
        createStory: '10016/mdvn-story-papi/story/createStory',
        getStoryById: '10016/mdvn-story-papi/story/rtrvStoryInfo',
        retrieveStories: '10016/mdvn-story-papi/story/rtrvStoryInfoList',
        updateStory: '10016/mdvn-story-papi/story/updateStory',
        addTask: '10003/mdvn-task-papi/task/createTask',
        updateTask: '10003/mdvn-task-papi/task/updateTask',
        createModel: '10010/mdvn-model-papi/model/createModel'
    };
}

export {url};