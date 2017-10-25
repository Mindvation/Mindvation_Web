import {connect} from 'react-redux';
import Department from '../components/HR/department/Department';

const mapStateToProps = (state) => {
    return {
        department: state.department
    }
};

export default connect(mapStateToProps)(Department);