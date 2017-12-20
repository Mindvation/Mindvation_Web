import {SET_REWARDS} from '../actions/reward_action';

function reward(state = {
    rewards: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case SET_REWARDS:
            return action.rewards;
        default:
            return state
    }
}

export default reward;