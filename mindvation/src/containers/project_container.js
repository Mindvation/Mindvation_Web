import {connect} from 'react-redux';
import Projects from '../components/projects/Projects';

const mapStateToProps = (state) => {
    return {
        projectList: state.project
    }
};

export default connect(mapStateToProps)(Projects)