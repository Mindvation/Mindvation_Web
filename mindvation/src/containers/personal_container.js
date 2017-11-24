import {connect} from 'react-redux';
import PersonalInfo from '../components/personal/PersonalInfo';

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps)(PersonalInfo)