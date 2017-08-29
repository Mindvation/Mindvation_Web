import {connect} from 'react-redux';
import ProjectList from '../components/projects/ProjectsList';

const mapStateToProps = (state) => {
    return {
        projectList: state.projects
    }
};

export default connect(mapStateToProps)(ProjectList)