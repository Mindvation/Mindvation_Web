let url;
const isProduction = false;

if (isProduction) {
    const gateWay = "http://192.168.0.254:";
    url = {
        login: gateWay + '8080/mdvn-staff-papi/staff/login',
        getRequirementById: gateWay + '8080/mdvn-reqmnt-papi/reqmnts/rtrvReqmntInfo',
        updateReqmntInfo: gateWay + '8080/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo',
        retrieveModels: gateWay + '8080/mdvn-model-papi/model/rtrvModelList',
        retrieveStaff: gateWay + '8080/mdvn-staff-papi/staff/rtrvStaffList',
        getModelById: gateWay + '8080/mdvn-model-papi/model/findById',
        createTag: gateWay + '8080/mdvn-tag-papi/tag/createTag',
        retrieveTags: gateWay + '8080/mdvn-tag-papi/tag/rtrvTagList',
        createProject: gateWay + '8080/mdvn-project-papi/project/createProject',
        retrieveProjects: gateWay + '8080/mdvn-project-papi/project/rtrvProjInfoList',
        getProjectById: gateWay + '8080/mdvn-project-papi/project/rtrvProjectInfo',
        updateProject: gateWay + '8080/mdvn-project-papi/project/updateProject',
        createRequirement: gateWay + '8080/mdvn-reqmnt-papi/reqmnts/createReqmnt',
        retrieveRequirements: gateWay + '8080/mdvn-reqmnt-papi/reqmnts/rtrvReqmntList',
        createStory: gateWay + '8080/mdvn-story-papi/story/createStory',
        getStoryById: gateWay + '8080/mdvn-story-papi/story/rtrvStoryInfo',
        retrieveStories: gateWay + '8080/mdvn-story-papi/story/rtrvStoryInfoList',
        updateStory: gateWay + '8080/mdvn-story-papi/story/updateStory',
        addTask: gateWay + '8080/mdvn-task-papi/task/createTask',
        updateTask: gateWay + '8080/mdvn-task-papi/task/updateTask',
        createModel: gateWay + '8080/mdvn-model-papi/model/createModel',
        uploadFile: gateWay + '8080/mdvn-file-papi/files/uploadFile',
        getModels: gateWay + '8080/mdvn-model-papi/model/rtrvModelList',
        getModelDetail: gateWay + '8080/mdvn-model-papi/model/findModelDetailById',
        addFileToTask: gateWay + '8080/mdvn-task-papi/task/addAttachForTask',
        removeFileFromTask: gateWay + '8080/mdvn-task-papi/task/deleteAttachForTask',
        rtrvStoryList: gateWay + '8080/mdvn-dashboard-papi/dashboard/rtrvStoryList',
        updateDashboard: gateWay + '8080/mdvn-dashboard-papi/dashboard/updateDashboard'
    };
} else {
    const gateWay = "http://192.168.0.102:";
    url = {
        login: gateWay + '10014/mdvn-staff-papi/staff/login',
        getRequirementById: gateWay + '10011/mdvn-reqmnt-papi/reqmnts/rtrvReqmntInfo',
        updateReqmntInfo: gateWay + '10011/mdvn-reqmnt-papi/reqmnts/updateReqmntInfo',
        retrieveModels: gateWay + '10010/mdvn-model-papi/model/rtrvModelList',
        retrieveStaff: gateWay + '10014/mdvn-staff-papi/staff/rtrvStaffList',
        getModelById: gateWay + '10010/mdvn-model-papi/model/findById',
        createTag: gateWay + '10001/mdvn-tag-papi/tag/createTag',
        retrieveTags: gateWay + '10001/mdvn-tag-papi/tag/rtrvTagList',
        createProject: gateWay + '10006/mdvn-project-papi/project/createProject',
        retrieveProjects: gateWay + '10006/mdvn-project-papi/project/rtrvProjInfoList',
        getProjectById: gateWay + '10006/mdvn-project-papi/project/rtrvProjectInfo',
        updateProject: gateWay + '10006/mdvn-project-papi/project/updateProject',
        createRequirement: gateWay + '10011/mdvn-reqmnt-papi/reqmnts/createReqmnt',
        retrieveRequirements: gateWay + '10011/mdvn-reqmnt-papi/reqmnts/rtrvReqmntList',
        createStory: gateWay + '10016/mdvn-story-papi/story/createStory',
        getStoryById: gateWay + '10016/mdvn-story-papi/story/rtrvStoryInfo',
        retrieveStories: gateWay + '10016/mdvn-story-papi/story/rtrvStoryInfoList',
        updateStory: gateWay + '10016/mdvn-story-papi/story/updateStory',
        addTask: gateWay + '10003/mdvn-task-papi/task/createTask',
        updateTask: gateWay + '10003/mdvn-task-papi/task/updateTask',
        createModel: gateWay + '10010/mdvn-model-papi/model/createModel',
        uploadFile: gateWay + '10020/mdvn-file-papi/files/uploadFile',
        getModels: gateWay + '10010/mdvn-model-papi/model/rtrvModelList',
        getModelDetail: gateWay + '10010/mdvn-model-papi/model/findModelDetailById',
        addFileToTask: gateWay + '10003/mdvn-task-papi/task/addAttachForTask',
        removeFileFromTask: gateWay + '10003/mdvn-task-papi/task/deleteAttachForTask',
        rtrvStoryList: gateWay + '10018/mdvn-dashboard-papi/dashboard/rtrvStoryList',
        updateDashboard: gateWay + '10018/mdvn-dashboard-papi/dashboard/updateDashboard'
    };
}

export {url};