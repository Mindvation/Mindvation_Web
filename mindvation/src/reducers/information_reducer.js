import {GET_INFORMATION_LIST} from '../actions/information_action';

function information(state = {
    infoList: [],
    totalNumber: 0
}, action) {
    switch (action.type) {
        case GET_INFORMATION_LIST:
            let temp = {...state};
            if (action.information.serverPushes) {
                temp.infoList = state.infoList.concat(action.information.serverPushes);
            }
            temp.totalNumber = action.information.totalNumbers;
            return temp;
        default:
            return state;
    }
}

export default information;