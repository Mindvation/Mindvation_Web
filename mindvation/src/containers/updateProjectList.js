import {connect} from 'react-redux';
import ProjectList from '../components/projects/ProjectsList';

const mapStateToProps = (state) => {
    return {
        projectList: state.project
    }
};

export default connect(mapStateToProps)(ProjectList)