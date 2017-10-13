import {connect} from 'react-redux';
import AddTags from '../components/projects/create/AddTags';

const mapStateToProps = (state) => {
    return {
        allTags: state.tags
    }
};

export default connect(mapStateToProps, null, null, {withRef: true})(AddTags);