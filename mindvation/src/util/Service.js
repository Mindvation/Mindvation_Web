import {post} from './request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {
    convertModelOptionToLocal,
    convertStaffOptionToLocal,
    convertModelInfoToLocal,
    convertModelToServer,
    convertModelDetailToLocal
} from '../util/Convert';
import {url} from './ServiceUrl';

export function retrieveModels(callback) {
    post(url.retrieveModels, {})
        .then((res) => {
            callback(convertModelOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function retrieveStaff(callback) {
    post(url.retrieveStaff, {})
        .then((res) => {
            callback(convertStaffOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getModelById(id, callback) {
    post(url.getModelById, {modelId: id})
        .then((res) => {
            callback(convertModelInfoToLocal(res.responseBody));
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