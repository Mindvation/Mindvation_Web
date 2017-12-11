import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Image from './Image';
import {Progress} from 'antd';
import {Popup} from 'semantic-ui-react';

class MvProgress extends Component {

    render() {
        const {mode = 'charts', percent = 0, editProgress, readOnly, checkHistory} = this.props;
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
                    <div className="progress-action">
                        <div className="progress-history-button" onClick={() => {
                            checkHistory()
                        }}>
                            <Popup
                                trigger={<div><Image name="history" style={{marginRight: 0}}/></div>}
                                content={<FormattedMessage
                                    id='taskHistory'
                                    defaultMessage='Task History'
                                />}
                                position='bottom center'
                                inverted
                                className="mode-desc-popup"
                                size="mini"
                            />
                        </div>
                        {!readOnly && editProgress ?
                            <div className="edit-progress-button" onClick={() => {
                                editProgress()
                            }}>
                                <Popup
                                    trigger={<div><Image name="edit" style={{marginRight: 0}}/></div>}
                                    content={<FormattedMessage
                                        id='editProgress'
                                        defaultMessage='Edit Progress'
                                    />}
                                    position='bottom center'
                                    inverted
                                    className="mode-desc-popup"
                                    size="mini"
                                />
                            </div> : null}
                    </div>
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