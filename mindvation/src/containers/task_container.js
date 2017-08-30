import {connect} from 'react-redux';
import Tasks from '../components/projects/create/Tasks';

const mapStateToProps = (state) => {
    return {
        tasks: state.task
    }
};

export default connect(mapStateToProps)(Tasks)