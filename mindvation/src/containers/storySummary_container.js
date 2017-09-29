import {connect} from 'react-redux';
import StorySummary from '../components/projects/MVPPlan/StorySummary';
import {
    withRouter
} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        story: state.story
    }
};

export default withRouter(connect(mapStateToProps)(StorySummary));