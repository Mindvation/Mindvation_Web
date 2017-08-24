import {connect} from 'react-redux';
import Checklist from '../components/projects/create/Checklist';

const mapStateToProps = (state) => {
    return {
        checklist: state.checklist
    }
};

export default connect(mapStateToProps)(Checklist)