import {connect} from 'react-redux';
import StoryList from '../components/projects/story/StoryList';

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        requirement: state.requirement
    }
};

export default connect(mapStateToProps)(StoryList)