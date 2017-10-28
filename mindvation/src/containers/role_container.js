import {connect} from 'react-redux';
import SelectMembers from '../components/projects/requirement/SelectMembers';

const mapStateToProps = (state) => {
    return {
        roles: state.role
    }
};

export default connect(mapStateToProps)(SelectMembers)