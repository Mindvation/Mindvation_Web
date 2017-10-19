import {post} from './request';
import {convertModelOptionToLocal, convertStaffOptionToLocal, convertModelInfoToLocal} from '../util/Convert';

export function retrieveModels(callback) {
    post('8080/mdvn-model-papi/model/rtrvModelList', {})
        .then((res) => {
            callback(convertModelOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function retrieveStaff(callback) {
    post('8080/mdvn-staff-papi/staff/rtrvStaffList', {})
        .then((res) => {
            callback(convertStaffOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getModelById(id, callback) {
    post('8080/mdvn-model-papi/model/findById', {modelId: id})
        .then((res) => {
            callback(convertModelInfoToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}