import React, {Component} from 'react';
import QuestionList from './QuestionList';
import CreateReward from './CreateReward';

class Reward extends Component {

    render() {
        return (
            <div>
                <CreateReward/>
                <QuestionList active={this.props.active}/>
            </div>
        );
    }
}

export default Reward;