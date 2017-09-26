import {connect} from 'react-redux';
import StorySummary from '../components/projects/MVPPlan/StorySummary';

const mapStateToProps = (state) => {
    return {
        story: state.story
    }
};

export default connect(mapStateToProps)(StorySummary);