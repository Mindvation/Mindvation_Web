import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {post} from './request';
import {convertModelOptionToLocal, convertStaffOptionToLocal} from '../util/Convert';

export function retrieveModels(callback) {
    post('10010/mdvn-model-p/model/rtrvModelList', {})
        .then((res) => {
            callback(convertModelOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function retrieveStaff(callback) {
    post('10014/mdvn-staff-p/staff/rtrvStaffList', {})
        .then((res) => {
            callback(convertStaffOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}