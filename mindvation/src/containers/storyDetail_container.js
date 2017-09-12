import {connect} from 'react-redux';
import StoryDetail from '../components/projects/story/detail/StoryDetail';

const mapStateToProps = (state) => {
    return {
        story: state.story
    }
};

export default connect(mapStateToProps)(StoryDetail);