import {connect} from 'react-redux';
import Issue from '../components/issue/Issue';

const mapStateToProps = (state) => {
    return {
        issue: state.issue
    }
};

export default connect(mapStateToProps)(Issue)