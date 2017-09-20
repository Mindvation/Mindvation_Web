import React, {Component} from 'react';
import Progress from './Progress';
import UploadMulti from './UploadMulti';
import PropTypes from 'prop-types';

class UploadAndProgress extends Component {

    render() {
        const {mode = "progress", percent = 0, editProgress, domeKey} = this.props;
        return <div>
            <div className="upload-progress-top">
                <UploadMulti/>
            </div>
            <div className="upload-progress-bar">
                <Progress mode={mode} percent={percent} editProgress={editProgress} domeKey={domeKey}/>
            </div>
        </div>
    }
}

UploadAndProgress.propTypes = {
    mode: PropTypes.string,
    percent: PropTypes.number,
    editProgress: PropTypes.func,
    images: PropTypes.array,
    domeKey: PropTypes.string
};


export default UploadAndProgress;
