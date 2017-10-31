import {connect} from 'react-redux';
import CreateStory from '../components/projects/story/CreateStory';

const mapStateToProps = (state) => {
    return {
        requirement: state.requirement
    }
};

export default connect(mapStateToProps)(CreateStory)