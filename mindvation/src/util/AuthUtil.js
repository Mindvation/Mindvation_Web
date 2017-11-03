const authConfig = {
    createProject: [1],
    updateProject: [1, 2],
    updateProjectStatus: [1],
    createProjectChecklist: [1, 2],
    updateProjectChecklist: [1, 2],
    MVPDashBoard: [2],
    createRequirement: [2],
    updateRequirement: [2, 3],
    updateRequirementStatus: [2],
    createRequirementChecklist: [2, 3],
    updateRequirementChecklist: [2, 3],
    createStory: [3, 4],
    updateStory: [3, 4],
    updateStoryStatus: [3],
    createTask: [4],
    updateTask: [5],
    updateTaskStatus: [5]
};

export function hasAuth(action, authCode) {
    if (!authCode || authCode.length === 0) return false;
    const authCodeList = authConfig[action];
    let authFlag = false;
    authCode.some((item) => {
        if (authCodeList.indexOf(item.authCode) > -1) {
            authFlag = true;
            return true;
        }
    });
    return authFlag;
}