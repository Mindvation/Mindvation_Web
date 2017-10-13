import {isEmpty, dateFormat} from './CommUtil';

export const convertProjectToLocal = (res) => {
    let project = {
        projectId: res.project.projId,
        projectName: res.project.name,
        description: res.project.description,
        priority: res.project.priority,
        leaders: res.leaders,
        displayLeaders: [],
        tags: res.tags,
        checklists: [],
        fileList: [],
        contingency: res.project.contingency,
        status: {
            status: res.project.status,
            percent: res.project.progress || 0,
            ragStatus: res.project.ragStatus
        }
    };

    if (!isEmpty(res.project.startDate)) {
        project.startDate = dateFormat(new Date(res.project.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.project.endDate)) {
        project.endDate = dateFormat(new Date(res.project.endDate), "yyyy-MM-dd");
    }

    if (res.checkLists && res.checkLists.length > 0) {
        res.checkLists.map((item) => {
            project.checklists.push(
                {
                    idNumber: item.projChecklists.checkListId,
                    description: item.projChecklists.checkListDesc,
                    assignee: {
                        value: item.executorInfo ? item.executorInfo.staffId : '',
                        text: item.executorInfo ? item.executorInfo.name : ''
                    },
                    assigner: {
                        value: item.assignerInfo.staffId,
                        text: item.assignerInfo.name
                    },
                    createDate: dateFormat(new Date(item.projChecklists.createTime), "yyyy-MM-dd hh:mm"),
                    lastUpdateDate: dateFormat(new Date(item.projChecklists.lastUpdateTime), "yyyy-MM-dd hh:mm"),
                    status: item.projChecklists.status
                }
            );
        })
    }

    if (res.models && res.models.length > 0) {
        res.models.map((model) => {
            if (model.modelType === "software") {
                project.softwareModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "engineering") {
                project.engineeringModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "business requirements") {
                project.businessModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "technology") {
                project.techniqueModel = {
                    text: model.name,
                    value: model.modelId
                }
            }
        })
    }

    if (res.leaders && res.leaders.length > 0) {
        res.leaders.map((leader) => {
            project.displayLeaders.push(leader.staffId);
        })
    }

    return project;
};

export const convertProjectToServer = (project) => {

    let params = {
        staffId: "m2",
        name: project.projectName,
        description: project.description,
        priority: project.priority,
        contingency: project.contingency,
        leaders: [],
        checkLists: [],
        tags: project.tags,
        models: []
    };

    if (project.startDate) {
        params.startDate = new Date(project.startDate).getTime()
    }

    if (project.endDate) {
        params.endDate = new Date(project.endDate).getTime()
    }

    if (project.leaders && project.leaders.length > 0) {
        project.leaders.map((leader) => {
            params.leaders.push({
                staffId: leader
            })
        })
    }

    if (project.checklists && project.checklists.length > 0) {
        project.checklists.map((checklist) => {
            params.checkLists.push({
                checkListDesc: checklist.description,
                executorId: checklist.assignee ? checklist.assignee.value : '',
                assignerId: "m2"
            })
        })
    }

    if (project.softwareModel) {
        params.models.push({
            modelId: project.softwareModel
        })
    }

    if (project.techniqueModel) {
        params.models.push({
            modelId: project.techniqueModel
        })
    }

    if (project.businessModel) {
        params.models.push({
            modelId: project.businessModel
        })
    }

    if (project.engineeringModel) {
        params.models.push({
            modelId: project.engineeringModel
        })
    }

    return params;
};

export const convertProjectBasicToServer = (basicInfo) => {
    return {
        projId: basicInfo.projectId,
        staffId: "m2",
        name: basicInfo.projectName,
        description: basicInfo.description
    };
};

export const convertProjectBasicToLocal = (res) => {
    return {
        projectName: res.project.name,
        description: res.project.description
    };
};

export const convertProjectAdditionalToServer = (additionalInfo) => {

    let params = {
        projId: additionalInfo.projectId,
        staffId: "m2",
        priority: additionalInfo.priority,
        contingency: additionalInfo.contingency,
        leaders: [],
        tags: additionalInfo.tags,
        models: []
    };

    if (additionalInfo.startDate) {
        params.startDate = new Date(additionalInfo.startDate).getTime()
    }

    if (additionalInfo.endDate) {
        params.endDate = new Date(additionalInfo.endDate).getTime()
    }

    if (additionalInfo.leaders && additionalInfo.leaders.length > 0) {
        additionalInfo.leaders.map((leader) => {
            params.leaders.push({
                staffId: leader
            })
        })
    }

    if (additionalInfo.softwareModel) {
        params.models.push({
            modelId: additionalInfo.softwareModel
        })
    }

    if (additionalInfo.techniqueModel) {
        params.models.push({
            modelId: additionalInfo.techniqueModel
        })
    }

    if (additionalInfo.businessModel) {
        params.models.push({
            modelId: additionalInfo.businessModel
        })
    }

    if (additionalInfo.engineeringModel) {
        params.models.push({
            modelId: additionalInfo.engineeringModel
        })
    }

    return params;
};

export const convertProjectAdditionalToLocal = (res) => {
    let project = {
        description: res.project.description,
        priority: res.project.priority,
        leaders: res.leaders,
        displayLeaders: [],
        tags: res.tags,
        contingency: res.project.contingency
    };

    if (!isEmpty(res.project.startDate)) {
        project.startDate = dateFormat(new Date(res.project.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.project.endDate)) {
        project.endDate = dateFormat(new Date(res.project.endDate), "yyyy-MM-dd");
    }

    if (res.models && res.models.length > 0) {
        res.models.map((model) => {
            if (model.modelType === "software") {
                project.softwareModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "engineering") {
                project.engineeringModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "business requirements") {
                project.businessModel = {
                    text: model.name,
                    value: model.modelId
                }
            }

            if (model.modelType === "technology") {
                project.techniqueModel = {
                    text: model.name,
                    value: model.modelId
                }
            }
        })
    }

    if (res.leaders && res.leaders.length > 0) {
        res.leaders.map((leader) => {
            project.displayLeaders.push(leader.staffId);
        })
    }

    return project;
};

export const convertProjectOptionalToServer = (optionalInfo) => {
    let params = {
        projId: optionalInfo.projectId,
        staffId: "m2",
        checkLists: []
    };

    if (optionalInfo.checklists && optionalInfo.checklists.length > 0) {
        optionalInfo.checklists.map((checklist) => {
            params.checkLists.push({
                checkListId: checklist.idNumber,
                checkListDesc: checklist.description,
                executorId: checklist.assignee.value,
                assignerId: "m2"
            })
        })
    }

    return params;
};

export const convertProjectOptionalToLocal = (res) => {

    let project = {
        checklists: []
    };

    if (res.checkLists && res.checkLists.length > 0) {
        res.checkLists.map((item) => {
            project.checklists.push(
                {
                    idNumber: item.projChecklists.checkListId,
                    description: item.projChecklists.checkListDesc,
                    assignee: {
                        value: item.executorInfo.staffId,
                        text: item.executorInfo.name
                    },
                    assigner: {
                        value: item.assignerInfo.staffId,
                        text: item.assignerInfo.name
                    },
                    createDate: dateFormat(new Date(item.projChecklists.createTime), "yyyy-MM-dd hh:mm"),
                    lastUpdateDate: dateFormat(new Date(item.projChecklists.lastUpdateTime), "yyyy-MM-dd hh:mm"),
                    status: item.projChecklists.status
                }
            );
        })
    }

    return project;
};


export const convertProjectStatusToServer = (statusInfo) => {
    return {
        projId: statusInfo.projectId,
        status: statusInfo.status
    };
};

export const convertProjectStatusToLocal = (res) => {
    return {
        status: {
            status: res.project.status,
            percent: res.project.progress || 0,
            ragStatus: res.project.ragStatus
        }
    };
};

export const convertModelOptionToLocal = (res) => {
    let modelOption = {
        softwareOption: [],
        engineeringOption: [],
        businessOption: [],
        techniqueOption: []
    };

    if (res.models && res.models.length > 0) {
        res.models.map((model) => {
            if (model.modelType === "software") {
                modelOption.softwareOption.push({
                    text: model.name,
                    value: model.modelId
                })
            }

            if (model.modelType === "engineering") {
                modelOption.engineeringOption.push({
                    text: model.name,
                    value: model.modelId
                })
            }

            if (model.modelType === "business requirements") {
                modelOption.businessOption.push({
                    text: model.name,
                    value: model.modelId
                })
            }

            if (model.modelType === "technology") {
                modelOption.techniqueOption.push({
                    text: model.name,
                    value: model.modelId
                })
            }
        })
    }

    return modelOption;
};

export const convertStaffOptionToLocal = (res) => {
    let staffOption = [];

    if (res.staffs && res.staffs.length > 0) {
        res.staffs.map((staff) => {
            staffOption.push({
                text: staff.name,
                value: staff.staffId,
                image: {avatar: true, src: staff.avatar}
            })
        })
    }

    return staffOption;
};