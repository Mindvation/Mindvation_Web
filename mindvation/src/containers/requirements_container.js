import {connect} from 'react-redux';
import RequirementList from '../components/projects/requirement/RequirementList';

const mapStateToProps = (state) => {
    return {
        requirements: state.requirements,
        project: state.project
    }
};

export default connect(mapStateToProps)(RequirementList)