import {connect} from 'react-redux';
import ProjectDetail from '../components/projects/detail/ProjectDetail';

const mapStateToProps = (state) => {
    return {
        project: state.project
    }
};

export default connect(mapStateToProps)(ProjectDetail)