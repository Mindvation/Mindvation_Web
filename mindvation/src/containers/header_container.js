import {connect} from 'react-redux';
import header from '../components/common/CommonHeader';

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps)(header)