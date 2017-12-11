import React, {Component} from 'react';
import Progress from './Progress';
import UploadMulti from './UploadMulti';
import PropTypes from 'prop-types';

class UploadAndProgress extends Component {

    render() {
        const {mode = "progress", percent = 0, editProgress, domeKey, readOnly, task, checkHistory} = this.props;
        return <div>
            <div className="upload-progress-top">
                <UploadMulti readOnly={readOnly} task={task}/>
            </div>
            <div className="upload-progress-bar">
                <Progress readOnly={readOnly} mode={mode} percent={percent} editProgress={editProgress}
                          domeKey={domeKey} checkHistory={checkHistory}/>
            </div>
        </div>
    }
}

UploadAndProgress.propTypes = {
    mode: PropTypes.string,
    percent: PropTypes.number,
    editProgress: PropTypes.func,
    images: PropTypes.array,
    domeKey: PropTypes.string,
    readOnly: PropTypes.bool
};


export default UploadAndProgress;
