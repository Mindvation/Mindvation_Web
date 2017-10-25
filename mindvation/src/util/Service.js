import {post} from './request';
import {
    convertModelOptionToLocal,
    convertStaffOptionToLocal,
    convertModelInfoToLocal,
    convertModelToServer
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
    post(url.createModel, params)
        .then((res) => {
            callback && callback(res.responseBody);
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getModels(type, page, pageSize, callback) {
    fetch('/stub/getModelList.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback(data)
        })
        .catch((e) => {
            console.log(e.message);
        });
}

export function getModelDetail(id, callback) {
    fetch('/stub/getModelDetail.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback(data)
        })
        .catch((e) => {
            console.log(e.message);
        });
}