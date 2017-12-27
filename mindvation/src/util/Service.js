import {post} from './request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {
    convertModelOptionToLocal,
    convertStaffOptionToLocal,
    convertModelInfoToLocal,
    convertModelToServer,
    convertModelDetailToLocal,
    convertDepartmentToLocal
} from '../util/Convert';
import {url} from './ServiceUrl';
import {getStaffId} from "./UserStore";
import {convertTaskToLocal} from "./Convert";

export function retrieveModels(callback) {
    post(url.retrieveModels, {
        criterion: 1,
        staffId: getStaffId()
    })
        .then((res) => {
            callback(convertModelOptionToLocal(res.data));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function retrieveStaff(callback) {
    post(url.retrieveStaff, {
        staffId: getStaffId()
    })
        .then((res) => {
            callback(convertStaffOptionToLocal(res.data));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getModelById(id, callback) {
    post(url.getModelById, {
            staffId: getStaffId(),
            criterion: id
        }
    )
        .then((res) => {
            callback(convertModelInfoToLocal(res.data));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function createModel(model, callback) {
    const params = convertModelToServer(model);
    StaticLoad.show("createModel");
    post(url.createModel, params)
        .then((res) => {
            StaticLoad.remove("createModel");
            callback && callback(res.responseBody);
        })
        .catch((error) => {
            StaticLoad.remove("createModel");
            StaticDialog.show("createModel-error", error.responseCode, error.message);
            console.info(error);
        });

}

export function getModels(params, callback) {
    post(url.getModels, params)
        .then((res) => {
            callback && callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getModelDetail(id, callback) {
    post(url.getModelDetail, {modelId: id})
        .then((res) => {
            const modelDetail = convertModelDetailToLocal(res.responseBody);
            callback && callback(modelDetail);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function addFileToTask(task, file) {
    post(url.addFileToTask, {
            taskId: task.idNumber,
            attachmentId: file.response.responseBody.id
        }
    )
        .then((res) => {
            console.info(res)
        })
        .catch((error) => {
            console.info(error);
        });
}

export function removeFileFromTask(task, file, callback) {
    post(url.removeFileFromTask, {
            taskId: task.idNumber,
            attachmentId: file.fileId
        }
    )
        .then(() => {
            callback();
        })
        .catch((error) => {
            console.info(error);
        });
}

export function rtrvStoryList(projectId, callback) {
    post(url.rtrvStoryList, {
            projId: projectId,
            creatorId: getStaffId()
        }
    )
        .then((res) => {
            callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function rtrvAllDashboard(projectId, callback) {
    post(url.rtrvAllDashboard, {
            projId: projectId
        }
    )
        .then((res) => {
            callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function updateDashboard(params, callback) {
    StaticLoad.show("updateDashboard");
    post(url.updateDashboard, params)
        .then(() => {
            StaticLoad.remove("updateDashboard");
            callback();
        })
        .catch((error) => {
            StaticLoad.remove("updateDashboard");
            StaticDialog.show("updateDashboard-error", error.responseCode, error.message);
        });
}

export function getMyTaskList(projectId, callback) {
    post(url.getMyTaskList, {
            projId: projectId,
            creatorId: getStaffId()
        }
    )
        .then((res) => {
            callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function updateTaskStatus(params, callback) {
    StaticLoad.show("updateTaskStatus");
    post(url.updateTaskStatus, params)
        .then((res) => {
            StaticLoad.remove("updateTaskStatus");
            callback(res.responseBody);
        })
        .catch((error) => {
            StaticLoad.remove("updateTaskStatus");
            StaticDialog.show("updateTaskStatus-error", error.responseCode, error.message);
        });
}

export function getTaskById(id, callback) {
    post(url.getTaskById, {
            taskId: id
        }
    )
        .then((res) => {
            const {task} = convertTaskToLocal(res.responseBody);
            callback(task);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getAllDepartment(callback) {
    post(url.getAllDepartment, {}
    )
        .then((res) => {
            const department = convertDepartmentToLocal(res.responseBody);
            callback(department);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function startIteration(params, callback) {
    StaticLoad.show("startIteration");
    post(url.startIteration, params)
        .then((res) => {
            StaticLoad.remove("startIteration");
            callback(res.responseBody);
        })
        .catch((error) => {
            StaticLoad.remove("startIteration");
            StaticDialog.show("startIteration-error", error.responseCode, error.message);
        });
}

export function getNextIterations(iterationInfo, callback) {
    post(url.getNextIterations, iterationInfo)
        .then((res) => {
            callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function closeIteration(params, callback) {
    StaticLoad.show("closeIteration");
    post(url.closeIteration, params)
        .then((res) => {
            StaticLoad.remove("closeIteration");
            callback(res.responseBody);
        })
        .catch((error) => {
            StaticLoad.remove("closeIteration");
            StaticDialog.show("closeIteration-error", error.responseCode, error.message);
        });
}

export function getTaskHistory(id, callback) {
    post(url.getTaskHistory, {
        taskId: id
    })
        .then((res) => {
            callback(res.responseBody);
        })
        .catch((error) => {
            StaticDialog.show("closeIteration-error", error.responseCode, error.message);
        });
}