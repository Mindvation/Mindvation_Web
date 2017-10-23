import {connect} from 'react-redux';
import Employee from '../components/HR/employee/Employee';

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
};

export default connect(mapStateToProps)(Employee);