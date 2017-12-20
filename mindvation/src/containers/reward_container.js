import {connect} from 'react-redux';
import Reward from '../components/reward/Reward';

const mapStateToProps = (state) => {
    return {
        reward: state.reward
    }
};

export default connect(mapStateToProps)(Reward)