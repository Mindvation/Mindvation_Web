import {connect} from 'react-redux';
import RequirementList from '../components/projects/requirement/RequirementList';

const mapStateToProps = (state) => {
    return {
        requirements: state.requirements
    }
};

export default connect(mapStateToProps)(RequirementList)