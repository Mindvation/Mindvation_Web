import {connect} from 'react-redux';
import ProjectRoles from '../components/projects/requirement/ProjectRoles';

const mapStateToProps = (state) => {
    return {
        roles: state.role
    }
};

export default connect(mapStateToProps)(ProjectRoles)