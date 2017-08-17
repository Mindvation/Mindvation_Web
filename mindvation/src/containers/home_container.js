import {connect} from 'react-redux';
import homePage from '../components/homePage/HomePage';

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps)(homePage)