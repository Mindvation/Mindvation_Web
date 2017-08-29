import {connect} from 'react-redux';
import Projects from '../components/projects/Projects';

const mapStateToProps = (state) => {
    return {
        projectList: state.projects
    }
};

export default connect(mapStateToProps)(Projects)