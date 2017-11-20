import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Image from './Image';
import {Progress} from 'antd';

class MvProgress extends Component {

    render() {
        const {mode = 'charts', percent = 0, editProgress, readOnly} = this.props;
        return (
            <div className="edit-progress">
                <div className="status-header upload-multi-title">
                    <Image name="progress"/>
                    <FormattedMessage
                        id='progress'
                        defaultMessage='Progress'
                    />
                </div>
                <div className="display-flex">
                    <Progress percent={percent} type={mode === "charts" ? "circle" : "line"}/>
                    {!readOnly && editProgress ?
                        <div className="edit-progress-button" onClick={() => {
                            editProgress()
                        }}>
                            <FormattedMessage
                                id='editProgress'
                                defaultMessage='Edit Progress'
                            />
                        </div> : null}
                </div>
            </div>
        );
    }
}

MvProgress.propTypes = {
    mode: PropTypes.string,
    percent: PropTypes.number,
    editProgress: PropTypes.func,
    domKey: PropTypes.string,
    readOnly: PropTypes.bool
};

export default MvProgress;