import {connect} from 'react-redux';
import CreateRequirement from '../components/projects/requirement/CreateRequirement';

const mapStateToProps = (state) => {
    return {
        requirement: state.requirement,
        project: state.project
    }
};

export default connect(mapStateToProps)(CreateRequirement)