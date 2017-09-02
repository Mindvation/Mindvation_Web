import {connect} from 'react-redux';
import Members from '../components/projects/requirement/ChooseMembers';

const mapStateToProps = (state) => {
    return {
        members: state.member
    }
};

export default connect(mapStateToProps, null, null, {withRef: true})(Members)