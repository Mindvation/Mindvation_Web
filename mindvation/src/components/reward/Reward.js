import React, {Component} from 'react';
import QuestionList from './QuestionList';
import CreateReward from './CreateReward';

class Reward extends Component {

    render() {
        const {reward, dispatch, active} = this.props;
        return (
            <div>
                <CreateReward dispatch={dispatch}/>
                <QuestionList dispatch={dispatch} active={active} reward={reward}/>
            </div>
        );
    }
}

export default Reward;