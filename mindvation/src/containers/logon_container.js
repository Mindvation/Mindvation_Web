import {connect} from 'react-redux';
import logon from '../components/logon/Logon';
import {logon as logonAction} from '../actions/user_action';

const mapDispatchToProps = (dispatch) => {
    return {
        userLogon: (user, callback) => {
            dispatch(logonAction(user, callback))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(logon)