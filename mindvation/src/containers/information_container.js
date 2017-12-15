import {connect} from 'react-redux';
import Information from '../components/common/Information';

const mapStateToProps = (state) => {
    return {
        information: state.information
    }
};

export default connect(mapStateToProps)(Information)