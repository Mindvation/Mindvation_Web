import {GET_INFORMATION_LIST, REMOVE_INFORMATION} from '../actions/information_action';

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
        case REMOVE_INFORMATION:
            let temp2 = {...state};
            let index = -1;
            temp2.infoList.some((item, i) => {
                if (item.uuId === action.id) {
                    index = i;
                    return true;
                }
            });
            if (index > -1) {
                temp2.infoList.splice(index, 1);
                temp2.totalNumber = temp2.totalNumber - 1;
            }
            return temp2;
        default:
            return state;
    }
}

export default information;