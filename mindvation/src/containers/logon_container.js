import {connect} from 'react-redux';
import logon from '../components/logon/Logon';
import {logon as logonAction} from '../actions/logon_action';

const mapDispatchToProps = (dispatch) => {
    return {
        userLogon: (user) => {
            dispatch(logonAction(user))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(logon)