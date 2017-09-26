import {connect} from 'react-redux';
import Checklist from '../components/projects/create/Checklist';

const mapStateToProps = (state) => {
    return {
        checklists: state.checklist
    }
};

export default connect(mapStateToProps)(Checklist)