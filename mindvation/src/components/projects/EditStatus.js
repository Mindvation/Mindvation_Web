import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Slider from '../common/Slider';
import PropTypes from 'prop-types';
import Image from '../common/Image';

class EditStatus extends Component {

    changeStatus = (status, progress) => {
        if (status !== "inProgress" && status === this.props.status.status) return;
        if (status === "inProgress" && progress === this.props.status.percent) return;
        this.props.changeStatus && this.props.changeStatus(status, progress);
    };

    render() {
        const {isStory, status = {}, disabled} = this.props;
        return (
            <div className="edit-status-component">
                <div className="status-header">
                    <Image name="status"/>
                    <FormattedMessage
                        id='Status'
                        defaultMessage='Status'
                    />
                </div>
                <div className={"edit-status-rag rag-color-" + status.ragStatus}>
                    {status.ragStatus === "R" ? "Red" : status.ragStatus === "A" ? "Amber" : "Green"}
                </div>
                <div>
                    <Button className={(status.status === "new" ? "status-indicator" : "") + " status-button"}
                            disabled={true}>
                        <FormattedMessage
                            id='new'
                            defaultMessage='New'
                        />
                    </Button>
                    <Button className={(status.status === "inProgress" ? "status-indicator" : "") + " status-button"}
                            onClick={() => this.changeStatus('inProgress')}
                            disabled={disabled || status.status === "done" || status.status === "close" || status.status === "hold"}>
                        <FormattedMessage
                            id='inProgress'
                            defaultMessage='In Progress'
                        />
                    </Button>
                    <Button className={(status.status === "done" ? "status-indicator" : "") + " status-button"}
                            disabled={disabled}
                            onClick={() => this.changeStatus('done')}>
                        <FormattedMessage
                            id='done'
                            defaultMessage='Done'
                        />
                    </Button>
                    {isStory ? <span>
                        <Button className={(status.status === "close" ? "status-indicator" : "") + " status-button"}
                                disabled={disabled}
                                onClick={() => this.changeStatus('close')}>
                            <FormattedMessage
                                id='close'
                                defaultMessage='Close'
                            />
                        </Button>
                        <Button className={(status.status === "hold" ? "status-indicator" : "") + " status-button"}
                                disabled={disabled}
                                onClick={() => this.changeStatus('hold')}>
                            <FormattedMessage
                                id='hold'
                                defaultMessage='Hold'
                            />
                        </Button>
                    </span> : null}
                    <Button className={(status.status === "reopen" ? "status-indicator" : "") + " status-button"}
                            disabled={disabled}
                            onClick={() => this.changeStatus('reopen')}>
                        <FormattedMessage
                            id='reopen'
                            defaultMessage='Reopen'
                        />
                    </Button>
                </div>
                {status.status === "inProgress" ? <div className="components-item edit-status-progress">
                    <Slider className="edit-status-slider"
                            disabled={true}
                            value={status.percent}
                            ref={node => this.progressNode = node}/>
                    {/*{disabled ? null : <Button compact className="edit-status-confirm"
                                               onClick={() => this.changeStatus('inProgress', this.progressNode.getValue())}>
                        <FormattedMessage
                            id='confirm'
                            defaultMessage='Confirm'
                        />
                    </Button>}*/}
                </div> : null}
            </div>
        );
    }
}

EditStatus.propTypes = {
    isStory: PropTypes.bool,
    changeStatus: PropTypes.func,
    status: PropTypes.object,
    disabled: PropTypes.bool
};

export default EditStatus;