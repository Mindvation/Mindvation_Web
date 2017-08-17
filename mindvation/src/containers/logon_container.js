import {connect} from 'react-redux';
import logon from '../components/logon/Logon';

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps)(logon)