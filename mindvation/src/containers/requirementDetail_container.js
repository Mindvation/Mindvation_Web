import {connect} from 'react-redux';
import RequirementDetail from '../components/projects/requirement/detail/RequirementDetail';

const mapStateToProps = (state) => {
    return {
        requirement: state.requirement
    }
};

export default connect(mapStateToProps)(RequirementDetail);