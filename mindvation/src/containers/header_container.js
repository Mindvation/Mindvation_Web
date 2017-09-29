import {connect} from 'react-redux';
import header from '../components/common/CommonHeader';
import {
    withRouter
} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default withRouter(connect(mapStateToProps)(header));