import {isEmpty, dateFormat, getTimeAndRandom} from './CommUtil';
import {getStaffId} from './UserStore';

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
        },
        requirementInfo: {
            requirementInfos: res.reqmntListResponse.requirementInfos,
            totalElements: res.reqmntListResponse.totalElements
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

    if (res.requirementInfos && res.requirementInfos.length > 0) {
        project.requirements = res.requirementInfos;
    }

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            project.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
    }

    if (project.requirementInfo.requirementInfos && project.requirementInfo.requirementInfos.length > 0) {
        project.requirementInfo.requirementInfos.map((req) => {
            let tempComments = [];
            if (req.commentDetails && req.commentDetails.length > 0) {
                req.commentDetails.map((comm) => {
                    tempComments.push(convertCommentToLocal(comm))
                })
            }
            req.comments = tempComments;
        })
    }

    return project;
};

export const convertProjectToServer = (project) => {

    let params = {
        staffId: getStaffId(),
        name: project.projectName,
        description: project.description,
        priority: project.priority,
        contingency: project.contingency,
        leaders: [],
        checkLists: [],
        tags: project.tags,
        models: [],
        attchUrls: []
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
                assignerId: getStaffId()
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

    if (project.fileList && project.fileList.length > 0) {
        project.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
};

export const convertProjectBasicToServer = (basicInfo) => {
    return {
        projId: basicInfo.projectId,
        staffId: getStaffId(),
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
        staffId: getStaffId(),
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
        staffId: getStaffId(),
        checkLists: [],
        attchUrls: []
    };

    if (optionalInfo.checklists && optionalInfo.checklists.length > 0) {
        optionalInfo.checklists.map((checklist) => {
            params.checkLists.push({
                checkListId: checklist.idNumber,
                checkListDesc: checklist.description,
                executorId: checklist.assignee.value,
                assignerId: getStaffId()
            })
        })
    }

    if (optionalInfo.fileList && optionalInfo.fileList.length > 0) {
        optionalInfo.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
};

export const convertProjectOptionalToLocal = (res) => {

    let project = {
        checklists: [],
        fileList: []
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

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            project.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
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
            if (model.model.modelType === "software") {
                modelOption.softwareOption.push({
                    text: model.model.name,
                    value: model.model.modelId
                })
            }

            if (model.model.modelType === "engineering") {
                modelOption.engineeringOption.push({
                    text: model.model.name,
                    value: model.model.modelId
                })
            }

            if (model.model.modelType === "business requirements") {
                modelOption.businessOption.push({
                    text: model.model.name,
                    value: model.model.modelId
                })
            }

            if (model.model.modelType === "technology") {
                modelOption.techniqueOption.push({
                    text: model.model.name,
                    value: model.model.modelId
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

export const convertMemberToLocal = (res) => {
    let members = [];
    if (res.staffMatched && res.staffMatched.length > 0) {
        res.staffMatched.map((staff) => {
            members.push({
                name: {
                    text: staff.staff.name,
                    value: staff.staff.staffId,
                    image: {
                        avatar: true,
                        src: staff.staff.avatar
                    }
                },
                tags: staff.tags,
                efficiency: staff.effective,
                contribution: staff.contribution,
                rec: staff.recommendation
            })
        })
    }
    return members;
};

export const convertModelInfoToLocal = (res) => {
    let functionOptions = [];
    let roles = [];

    if (res.modelRoles && res.modelRoles.length > 0) {
        res.modelRoles.map((role) => {
            roles.push({
                key: role.roleId,
                name: role.name
            })
        })
    }

    if (res.functionLabels && res.functionLabels.length > 0) {
        res.functionLabels.map((label) => {
            functionOptions.push({
                text: label.name,
                value: label.labelId
            })
        })
    }
    return {functionOptions, roles};
};

export const convertRequirementToServer = (requirement) => {
    let params = {
        projId: requirement.projectId,
        creatorId: getStaffId(),
        summary: requirement.summary,
        description: requirement.description,
        priority: requirement.priority,
        functionLabel: {},
        modelId: requirement.model,
        members: [],
        tags: requirement.tags,
        rCheckLists: [],
        attchUrls: []
    };

    if (requirement.startDate) {
        params.startDate = new Date(requirement.startDate).getTime()
    }

    if (requirement.endDate) {
        params.endDate = new Date(requirement.endDate).getTime()
    }

    if (requirement.functionLabel !== 'other') {
        params.functionLabel.labelId = requirement.functionLabel;
    } else {
        params.functionLabel.name = requirement.otherFunctionLabel;
    }

    if (requirement.checklists && requirement.checklists.length > 0) {
        requirement.checklists.map((checklist) => {
            params.rCheckLists.push({
                description: checklist.description,
                assigneeId: checklist.assignee ? checklist.assignee.value : '',
                assignerId: getStaffId()
            })
        })
    }

    if (requirement.roles && requirement.roles.length > 0) {
        requirement.roles.map((role) => {
            let tempRole = {
                roleId: role.key,
                memberIds: []
            };
            if (role.members && role.members.length > 0) {
                role.members.map((member) => {
                    tempRole.memberIds.push(member.name.value)
                })
            }
            params.members.push(tempRole);
        })
    }

    if (requirement.fileList && requirement.fileList.length > 0) {
        requirement.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
};

export function convertRequirementToLocal(res) {
    let requirement = {
        projectId: res.reqmntInfo.projId,
        reqId: res.reqmntInfo.reqmntId,
        summary: res.reqmntInfo.summary,
        description: res.reqmntInfo.description,
        functionLabel: res.labelDetail, //update
        subFunctionLabels: res.subFunctionLabels,
        priority: res.reqmntInfo.priority,
        storyPoints: res.reqmntInfo.totalStoryPoint,
        tags: res.tagList,
        roles: [],
        checklists: [],
        comments: [],
        stories: res.rtrvStoryListResponse,
        status: {
            status: res.reqmntInfo.status,
            percent: res.reqmntInfo.progress,
            ragStatus: res.reqmntInfo.ragStatus
        },
        fileList: [],
        model: res.reqmntInfo.modelId
    };

    if (!isEmpty(res.reqmntInfo.startDate)) {
        requirement.startDate = dateFormat(new Date(res.reqmntInfo.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.reqmntInfo.endDate)) {
        requirement.endDate = dateFormat(new Date(res.reqmntInfo.endDate), "yyyy-MM-dd");
    }

    if (res.checkLists && res.checkLists.length > 0) {
        res.checkLists.map((item) => {
            requirement.checklists.push(
                {
                    idNumber: item.checkListId,
                    description: item.description,
                    assignee: {
                        value: item.assignee ? item.assignee.staffId : '',
                        text: item.assignee ? item.assignee.name : ''
                    },
                    assigner: {
                        value: item.assigner.staffId,
                        text: item.assigner.name
                    },
                    createDate: dateFormat(new Date(item.createTime), "yyyy-MM-dd hh:mm"),
                    lastUpdateDate: dateFormat(new Date(item.lastUpdateTime), "yyyy-MM-dd hh:mm"),
                    status: item.status
                }
            );
        })
    }

    if (res.members && res.members.length > 0) {
        res.members.map((member) => {
            let tempRole = {
                key: member.roleDetail.roleId,
                name: member.roleDetail.name,
                members: []
            };

            if (member.memberDetails && member.memberDetails.length > 0) {
                member.memberDetails.map((roleMember) => {
                    tempRole.members.push({
                        name: {
                            text: roleMember.name,
                            value: roleMember.staffId,
                            image: {
                                avatar: true,
                                src: roleMember.avatar
                            }
                        },
                        tags: []
                    })
                })
            }
            requirement.roles.push(tempRole)
        })
    }

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            requirement.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
    }

    if (requirement.stories.stories && requirement.stories.stories.length > 0) {
        requirement.stories.stories.map((story) => {
            let tempComments = [];
            if (story.commentDetails && story.commentDetails.length > 0) {
                story.commentDetails.map((comm) => {
                    tempComments.push(convertCommentToLocal(comm))
                })
            }
            story.comments = tempComments;
        })
    }

    return requirement;
}

export const convertReqBasicToServer = (basicInfo) => {
    return {
        staffId: getStaffId(),
        reqmntInfo: {
            projId: basicInfo.projectId,
            reqmntId: basicInfo.reqId,
            summary: basicInfo.summary,
            description: basicInfo.description
        }
    }
};

export const convertReqBasicToLocal = (res) => {
    return {
        projectId: res.reqmntInfo.projId,
        reqId: res.reqmntInfo.reqmntId,
        summary: res.reqmntInfo.summary,
        description: res.reqmntInfo.description,
    };
};

export const convertReqOptionalToServer = (optionalInfo) => {
    let params = {
        staffId: getStaffId(),
        reqmntInfo: {
            projId: optionalInfo.projectId,
            reqmntId: optionalInfo.reqId
        },
        checkLists: [],
        attchUrls: []
    };

    if (optionalInfo.checklists && optionalInfo.checklists.length > 0) {
        optionalInfo.checklists.map((checklist) => {
            params.checkLists.push({
                checkListId: checklist.idNumber,
                description: checklist.description,
                assigneeId: checklist.assignee ? checklist.assignee.value : '',
                assignerId: getStaffId()
            })
        })
    }

    if (optionalInfo.fileList && optionalInfo.fileList.length > 0) {
        optionalInfo.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
};

export const convertReqOptionalToLocal = (res) => {
    let requirement = {
        projectId: res.reqmntInfo.projId,
        reqId: res.reqmntInfo.reqmntId,
        checklists: [],
        fileList: []
    };

    if (res.checkLists && res.checkLists.length > 0) {
        res.checkLists.map((item) => {
            requirement.checklists.push(
                {
                    idNumber: item.checkListId,
                    description: item.description,
                    assignee: {
                        value: item.assignee ? item.assignee.staffId : '',
                        text: item.assignee ? item.assignee.name : ''
                    },
                    assigner: {
                        value: item.assigner.staffId,
                        text: item.assigner.name
                    },
                    createDate: dateFormat(new Date(item.createTime), "yyyy-MM-dd hh:mm"),
                    lastUpdateDate: dateFormat(new Date(item.lastUpdateTime), "yyyy-MM-dd hh:mm"),
                    status: item.status
                }
            );
        })
    }

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            requirement.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
    }

    return requirement;
};

export const convertReqAdditionalToServer = (optionalInfo) => {
    let params = {
        staffId: getStaffId(),
        reqmntInfo: {
            projId: optionalInfo.projectId,
            reqmntId: optionalInfo.reqId,
            priority: optionalInfo.priority,
        },
        tags: optionalInfo.tags,
        members: []
    };

    if (optionalInfo.startDate) {
        params.startDate = new Date(optionalInfo.startDate).getTime()
    }

    if (optionalInfo.endDate) {
        params.endDate = new Date(optionalInfo.endDate).getTime()
    }

    if (optionalInfo.roles && optionalInfo.roles.length > 0) {
        optionalInfo.roles.map((role) => {
            let tempRole = {
                roleId: role.key,
                memberIds: []
            };
            if (role.members && role.members.length > 0) {
                role.members.map((member) => {
                    tempRole.memberIds.push(member.name.value)
                })
            }
            params.members.push(tempRole);
        })
    }

    return params;
};

export function convertReqAdditionalToLocal(res) {
    let requirement = {
        projectId: res.reqmntInfo.projId,
        reqId: res.reqmntInfo.reqmntId,
        priority: res.reqmntInfo.priority,
        storyPoints: res.reqmntInfo.totalStoryPoint,
        tags: res.tagList,
        roles: []
    };

    if (!isEmpty(res.reqmntInfo.startDate)) {
        requirement.startDate = dateFormat(new Date(res.reqmntInfo.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.reqmntInfo.endDate)) {
        requirement.endDate = dateFormat(new Date(res.reqmntInfo.endDate), "yyyy-MM-dd");
    }

    if (res.members && res.members.length > 0) {
        res.members.map((member) => {
            let tempRole = {
                key: member.roleDetail.roleId,
                name: member.roleDetail.name,
                members: []
            };

            if (member.memberDetails && member.memberDetails.length > 0) {
                member.memberDetails.map((roleMember) => {
                    tempRole.members.push({
                        name: {
                            text: roleMember.name,
                            value: roleMember.staffId,
                            image: {
                                avatar: true,
                                src: roleMember.avatar
                            }
                        },
                        tags: []
                    })
                })
            }
            requirement.roles.push(tempRole)
        })
    }

    return requirement;
}


export function convertReqStatusToServer(statusInfo) {
    return {
        staffId: getStaffId(),
        reqmntInfo: {
            projId: statusInfo.projectId,
            reqmntId: statusInfo.reqId,
            status: statusInfo.status
        }
    };
}

export function convertReqStatusToLocal(res) {
    return {
        projectId: res.reqmntInfo.projId,
        reqId: res.reqmntInfo.reqmntId,
        status: {
            status: res.reqmntInfo.status,
            percent: res.reqmntInfo.progress,
            ragStatus: res.reqmntInfo.ragStatus
        }
    };
}

export function convertReqCommentToServer(reqInfo, commentInfo) {
    let params = {
        projId: reqInfo.projId,
        subjectId: reqInfo.reqmntId,
        creatorId: getStaffId(),
        content: commentInfo.text,
        passiveAts: []
    };

    if (commentInfo.mentions && commentInfo.mentions.length > 0) {
        commentInfo.mentions.map((mention) => {
            params.passiveAts.push(mention.value)
        })
    }

    if (commentInfo.reply && commentInfo.reply.commentId) {
        params.replyId = commentInfo.reply.commentId
    }

    return params;
}

export function convertStoryToServer(story) {
    let params = {
        creatorId: getStaffId(),
        storyInfo: {
            projId: story.projectId,
            reqmntId: story.reqId,
            summary: story.summary,
            description: story.description,
            priority: story.priority,
            storyPoint: story.storyPoints
        },
        subFunctionLabel: {
            name: story.functionLabel
        },
        members: [],
        sTags: story.tags,
        attchUrls: []
    };

    if (story.startDate) {
        params.storyInfo.startDate = new Date(story.startDate).getTime()
    }

    if (story.endDate) {
        params.storyInfo.endDate = new Date(story.endDate).getTime()
    }

    if (story.functionLabel === 'other') {
        params.subFunctionLabel.name = story.functionOtherLabel;
    } else {
        if (story.functionLabel) {
            params.subFunctionLabel.labelId = story.functionLabel;
        }
        if (story.functionTextLabel) {
            params.subFunctionLabel.name = story.functionTextLabel;
        }
    }

    if (story.roles && story.roles.length > 0) {
        story.roles.map((role) => {
            let tempRole = {
                roleId: role.key,
                memberIds: []
            };
            if (role.members && role.members.length > 0) {
                role.members.map((member) => {
                    tempRole.memberIds.push(member.name.value)
                })
            }
            params.members.push(tempRole);
        })
    }

    if (story.fileList && story.fileList.length > 0) {
        story.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
}

export function convertStoryToLocal(res) {
    let story = {
        projectId: res.storyInfo.projId,
        reqId: res.storyInfo.reqmntId,
        storyId: res.storyInfo.storyId,
        summary: res.storyInfo.summary,
        description: res.storyInfo.description,
        functionLabel: res.subFunctionLabel,
        subFunctionLabels: res.subFunctionLabels,
        priority: res.storyInfo.priority,
        tags: res.tags,
        roles: [],
        tasks: [],
        fileList: [],
        comments: [],
        requirementRoles: [],
        requirementFunctionLabel: res.labelDetail,
        status: {
            status: res.storyInfo.status,
            percent: res.storyInfo.progress,
            ragStatus: res.storyInfo.ragStatus
        },
        taskDeliveries: []
    };

    if (!isEmpty(res.storyInfo.storyPoint)) {
        story.storyPoints = res.storyInfo.storyPoint + '';
    }

    if (!isEmpty(res.storyInfo.startDate)) {
        story.startDate = dateFormat(new Date(res.storyInfo.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.storyInfo.endDate)) {
        story.endDate = dateFormat(new Date(res.storyInfo.endDate), "yyyy-MM-dd");
    }

    if (res.members && res.members.length > 0) {
        res.members.map((member) => {
            let tempRole = {
                key: member.roleDetail.roleId,
                name: member.roleDetail.name,
                members: []
            };

            if (member.memberDetails && member.memberDetails.length > 0) {
                member.memberDetails.map((roleMember) => {
                    tempRole.members.push({
                        name: {
                            text: roleMember.name,
                            value: roleMember.staffId,
                            image: {
                                avatar: true,
                                src: roleMember.avatar
                            }
                        },
                        tags: []
                    })
                })
            }
            story.roles.push(tempRole)
        })
    }

    if (res.rMembers && res.rMembers.length > 0) {
        res.rMembers.map((member) => {
            let tempRole = {
                key: member.roleDetail.roleId,
                name: member.roleDetail.name,
                members: []
            };

            if (member.memberDetails && member.memberDetails.length > 0) {
                member.memberDetails.map((roleMember) => {
                    tempRole.members.push({
                        name: {
                            text: roleMember.name,
                            value: roleMember.staffId,
                            image: {
                                avatar: true,
                                src: roleMember.avatar
                            }
                        },
                        tags: []
                    })
                })
            }
            story.requirementRoles.push(tempRole)
        })
    }

    if (res.sTasks && res.sTasks.length > 0) {
        res.sTasks.map((item) => {
            const {task} = convertTaskToLocal(item);
            story.tasks.push(task)
        })
    }

    if (res.taskDeliveries && res.taskDeliveries.length > 0) {
        res.taskDeliveries.map((delivery) => {
            story.taskDeliveries.push({
                text: delivery.name,
                data: {
                    key: getTimeAndRandom(),
                    type: delivery.type,
                    title: delivery.name,
                    images: []
                }
            },)
        });
    }

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            story.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
    }

    return story;
}

export function convertStoryOptionalToServer(optionalInfo) {
    let params = {
        creatorId: getStaffId(),
        storyInfo: {
            storyId: optionalInfo.storyId
        },
        attchUrls: []
    };
    if (optionalInfo.fileList && optionalInfo.fileList.length > 0) {
        optionalInfo.fileList.map((file) => {
            params.attchUrls.push({
                attachmentId: file.fileId
            })
        });
    }

    return params;
}

export function convertStoryOptionalToLocal(res) {
    let story = {
        projectId: res.storyInfo.projId,
        reqId: res.storyInfo.reqmntId,
        storyId: res.storyInfo.storyId,
        fileList: []
    };

    if (res.attchInfos && res.attchInfos.length > 0) {
        res.attchInfos.map((attach) => {
            story.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url
            })
        });
    }

    return story;
}

export function convertStoryBasicToServer(basicInfo) {
    return {
        creatorId: getStaffId(),
        storyInfo: {
            storyId: basicInfo.storyId,
            summary: basicInfo.summary,
            description: basicInfo.description
        }
    }
}

export function convertStoryBasicToLocal(res) {
    return {
        storyId: res.storyInfo.storyId,
        summary: res.storyInfo.summary,
        description: res.storyInfo.description,
    }
}

export function convertStoryStatusToServer(statusInfo) {
    return {
        creatorId: getStaffId(),
        storyInfo: {
            storyId: statusInfo.storyId,
            status: statusInfo.status
        }
    }
}

export function convertStoryStatusToLocal(res) {
    return {
        projectId: res.storyInfo.projId,
        reqId: res.storyInfo.reqmntId,
        storyId: res.storyInfo.storyId,
        status: {
            status: res.storyInfo.status,
            percent: res.storyInfo.progress,
            ragStatus: res.storyInfo.ragStatus
        }
    }
}

export function convertStoryAdditionalToServer(additionalInfo) {
    let params = {
        creatorId: getStaffId(),
        storyInfo: {
            projId: additionalInfo.projectId,
            storyId: additionalInfo.storyId,
            priority: additionalInfo.priority,
            storyPoint: additionalInfo.storyPoints
        },
        subFunctionLabel: {},
        members: [],
        sTags: additionalInfo.tags
    };

    if (additionalInfo.startDate) {
        params.storyInfo.startDate = new Date(additionalInfo.startDate).getTime()
    }

    if (additionalInfo.endDate) {
        params.storyInfo.endDate = new Date(additionalInfo.endDate).getTime()
    }

    if (additionalInfo.functionLabel === 'other') {
        params.subFunctionLabel.name = additionalInfo.functionOtherLabel;
    } else {
        if (additionalInfo.functionLabel) {
            params.subFunctionLabel.labelId = additionalInfo.functionLabel;
        }
        if (additionalInfo.functionTextLabel) {
            params.subFunctionLabel.name = additionalInfo.functionTextLabel;
        }
    }

    if (additionalInfo.roles && additionalInfo.roles.length > 0) {
        additionalInfo.roles.map((role) => {
            let tempRole = {
                roleId: role.key,
                memberIds: []
            };
            if (role.members && role.members.length > 0) {
                role.members.map((member) => {
                    tempRole.memberIds.push(member.name.value)
                })
            }
            params.members.push(tempRole);
        })
    }

    return params;
}

export function convertStoryCommentToServer(storyInfo, commentInfo) {
    let params = {
        projId: storyInfo.projId,
        subjectId: storyInfo.storyId,
        creatorId: getStaffId(),
        content: commentInfo.text,
        passiveAts: []
    };

    if (commentInfo.mentions && commentInfo.mentions.length > 0) {
        commentInfo.mentions.map((mention) => {
            params.passiveAts.push(mention.value)
        })
    }

    if (commentInfo.reply && commentInfo.reply.commentId) {
        params.replyId = commentInfo.reply.commentId
    }

    return params;
}

export function convertStoryAdditionalToLocal(res) {
    let story = {
        projectId: res.storyInfo.projId,
        reqId: res.storyInfo.reqmntId,
        storyId: res.storyInfo.storyId,
        functionLabel: res.subFunctionLabel,
        priority: res.storyInfo.priority,
        tags: res.tags,
        roles: []
    };

    if (!isEmpty(res.storyInfo.storyPoint)) {
        story.storyPoints = res.storyInfo.storyPoint + '';
    }

    if (!isEmpty(res.storyInfo.startDate)) {
        story.startDate = dateFormat(new Date(res.storyInfo.startDate), "yyyy-MM-dd");
    }

    if (!isEmpty(res.storyInfo.endDate)) {
        story.endDate = dateFormat(new Date(res.storyInfo.endDate), "yyyy-MM-dd");
    }

    if (res.members && res.members.length > 0) {
        res.members.map((member) => {
            let tempRole = {
                key: member.roleDetail.roleId,
                name: member.roleDetail.name,
                members: []
            };

            if (member.memberDetails && member.memberDetails.length > 0) {
                member.memberDetails.map((roleMember) => {
                    tempRole.members.push({
                        name: {
                            text: roleMember.name,
                            value: roleMember.staffId,
                            image: {
                                avatar: true,
                                src: roleMember.avatar
                            }
                        },
                        tags: []
                    })
                })
            }
            story.roles.push(tempRole)
        })
    }
    return story;
}

export function convertTaskToServer(taskInfo) {
    let params = {
        description: taskInfo.description,
        usedTime: taskInfo.workload,
        creatorId: getStaffId(),
        storyId: taskInfo.storyId,
        projId: taskInfo.projectId,
        deliver: {}
    };

    if (taskInfo.startDate) {
        params.startTime = new Date(taskInfo.startDate).getTime()
    }

    if (taskInfo.endDate) {
        params.endTime = new Date(taskInfo.endDate).getTime()
    }

    if (taskInfo.model) {
        params.deliver = {
            name: taskInfo.model.title,
            modelId: taskInfo.model.type
        }
    }

    return params;
}

export function convertTaskToLocal(res) {
    let task = {
        storyId: res.storyId,
        idNumber: res.taskId,
        description: res.description,
        assignee: res.assignee,
        assigner: res.creator,
        model: {},
        fileList: [],
        authCode: res.staffAuthInfo,
        progress: res.progress
    };

    let story = {};
    if (res.story) {
        story = {
            projectId: res.story.projId,
            reqId: res.story.reqmntId,
            storyId: res.story.storyId,
            status: {
                status: res.story.status,
                percent: res.story.progress,
                ragStatus: res.story.ragStatus
            }
        }
    }

    if (!isEmpty(res.startTime)) {
        task.startDate = dateFormat(new Date(res.startTime), "yyyy-MM-dd");
    }

    if (!isEmpty(res.endTime)) {
        task.endDate = dateFormat(new Date(res.endTime), "yyyy-MM-dd");
    }

    if (res.deliver) {
        task.model = {
            key: getTimeAndRandom(),
            type: res.deliver.modelId,
            title: res.deliver.name,
            percent: res.progress,
            images: []
        }
    }

    if (res.attachUrlList && res.attachUrlList.length > 0) {
        res.attachUrlList.map((attach) => {
            task.fileList.push({
                uid: attach.id,
                fileId: attach.id,
                name: attach.originName,
                status: "done",
                url: attach.url,
                thumbUrl: attach.url
            })
        })
    }

    /*if (res.staffAuthInfo && res.staffAuthInfo.length > 0) {
        res.staffAuthInfo.map((auth) => {
            task.authCode.push(auth.authCode)
        })
    }*/

    return {task, story};
}

export function convertTaskStatusToServer(statusInfo) {
    return {
        assigneeId: getStaffId(),
        taskId: statusInfo.idNumber,
        progress: statusInfo.model.percent,
        remarks: statusInfo.remark
    }
}

export function convertModelToServer(modelInfo) {
    let params = {
        creatorId: getStaffId(),
        name: modelInfo.basicInfo.modelName,
        modelType: modelInfo.basicInfo.business,
        functionLabels: [],
        roles: [],
        iterationModels: [],
        taskDeliveries: []
    };

    if (modelInfo.basicInfo.processLabel && modelInfo.basicInfo.processLabel.length > 0) {
        modelInfo.basicInfo.processLabel.map((process) => {
            let tempProcess = {
                name: process.value,
                subFunctionLabels: []
            };
            if (process.subData && process.subData.length > 0) {
                process.subData.map((subProcess) => {
                    tempProcess.subFunctionLabels.push(
                        {
                            name: subProcess.value
                        })
                })
            }
            params.functionLabels.push(tempProcess);
        });
    }

    if (modelInfo.basicInfo.roles && modelInfo.basicInfo.roles.length > 0) {
        modelInfo.basicInfo.roles.map((role) => {
            params.roles.push({
                name: role.value
            });
        });
    }

    if (modelInfo.iteration && modelInfo.iteration.length > 0) {
        modelInfo.iteration.map((iteration) => {
            let tempIter = {
                name: iteration.value,
                labels: []
            };
            if (iteration.labels && iteration.labels.length > 0) {
                iteration.labels.map((label) => {
                    tempIter.labels.push(label.value)
                })
            }
            params.iterationModels.push(tempIter)
        })
    }
    if (modelInfo.attachments && modelInfo.attachments.length > 0) {
        modelInfo.attachments.map((attach) => {
            params.taskDeliveries.push({
                type: attach.type,
                name: attach.title,
                style: attach.style
            })
        })
    }
    return params;
}

export function convertModelDetailToLocal(res) {
    let modelDetail = {
        basicInfo: {
            modelName: res.model.name,
            business: res.model.modelType,
            processLabel: [],
            roles: []
        },
        iteration: [],
        attachments: []
    };

    if (res.functionLabels && res.functionLabels.length > 0) {
        res.functionLabels.map((label) => {
            let tempLabel = {
                key: label.modelId,
                value: label.name,
                subData: []
            };
            if (label.subFunctionLabels && label.subFunctionLabels.length > 0) {
                label.subFunctionLabels.map((subLabel) => {
                    tempLabel.subData.push({
                        key: subLabel.labelId,
                        value: subLabel.name
                    })
                });
            }
            modelDetail.basicInfo.processLabel.push(tempLabel);
        })
    }

    if (res.roles && res.roles.length > 0) {
        res.roles.map((role) => {
            modelDetail.basicInfo.roles.push({
                key: role.roleId,
                value: role.name
            })
        })
    }

    if (res.taskDeliveries && res.taskDeliveries.length > 0) {
        res.taskDeliveries.map((delivery) => {
            modelDetail.attachments.push({
                key: delivery.uuId,
                type: delivery.type,
                title: delivery.name,
                style: delivery.style
            })
        })
    }

    if (res.iterationModels && res.iterationModels.length > 0) {
        res.iterationModels.map((iteration) => {
            let tempIteration = {
                key: iteration.iterationModel.uuId,
                value: iteration.iterationModel.name,
                labels: []
            };

            if (iteration.functionLabels && iteration.functionLabels.length > 0) {
                iteration.functionLabels.map((label) => {
                    tempIteration.labels.push({
                        key: label.labelId,
                        value: label.name
                    })
                })
            }

            modelDetail.iteration.push(tempIteration);
        })
    }

    return modelDetail;
}

export function convertEmployeeToServer(employee) {
    let params = {
        creatorId: getStaffId(),
        name: employee.name,
        account: employee.logonName,
        password: employee.initialPassword,
        gender: employee.gender,
        deptId: employee.department,
        positionId: employee.position,
        positionLvl: employee.positionLevel,
        emailAddr: employee.mail,
        phoneNum: employee.phone,
        tagIds: [],
        status: employee.status
    };

    if (employee.skillTags && employee.skillTags.length > 0) {
        employee.skillTags.map((tag) => {
            params.tagIds.push(tag.tagId)
        })
    }

    return params;
}

export function convertEditEmployeeToServer(employee) {
    let params = {
        staffInfo: {
            staffId: employee.staffId,
            account: employee.logonName,
            name: employee.name,
            deptId: employee.department,
            positionId: employee.position,
            gender: employee.gender,
            positionLvl: employee.positionLevel,
            emailAddr: employee.mail,
            phoneNum: employee.phone,
            status: employee.status
        },
        tagIds: []
    };

    if (employee.skillTags && employee.skillTags.length > 0) {
        employee.skillTags.map((tag) => {
            params.tagIds.push(tag.tagId)
        })
    }

    return params;
}

export function convertEmployeeToLocal(res) {
    return {
        staffId: res.staffInfo.staffId,
        name: res.staffInfo.name,
        logonName: res.staffInfo.account,
        initialPassword: res.staffInfo.password,
        gender: res.staffInfo.gender,
        department: res.staffInfo.deptId,
        position: res.staffInfo.positionId,
        positionLevel: res.staffInfo.positionLvl,
        mail: res.staffInfo.emailAddr,
        phone: res.staffInfo.phoneNum,
        skillTags: res.tags,
        status: res.staffInfo.status
    }
}

export function convertDepartmentToLocal(res) {
    let department = [];
    if (res && res.length > 0) {
        res.map((item) => {
            let tempDepartment = {
                value: item.id,
                text: item.name,
                positions: []
            };

            if (item.positions && item.positions.length > 0) {
                item.positions.map((position) => {
                    tempDepartment.positions.push({
                        value: position.id,
                        text: position.name
                    })
                })
            }
            department.push(tempDepartment)
        })
    }

    return department;
}

export function convertCommentToLocal(res) {
    let comment = {
        commentId: res.comment.commentId,
        author: {
            text: res.comment.creatorInfo ? res.comment.creatorInfo.name : '',
            value: res.comment.creatorInfo ? res.comment.creatorInfo.staffId : '',
            image: res.comment.creatorInfo ? res.comment.creatorInfo.avatar : ''
        },
        time: dateFormat(new Date(res.comment.createTime), 'yyyy-MM-dd hh:mm:ss'),
        text: res.comment.content,
        approve: res.comment.likeIds ? res.comment.likeIds.split(",") : [],
        disagree: res.comment.dislikeIds ? res.comment.dislikeIds.split(",") : []
    };

    if (res.replyDetail) {
        comment.replyInfo = {
            replyId: res.replyDetail.commentId,
            replyStaff: res.replyDetail.creatorInfo
        }
    }

    return comment;
}