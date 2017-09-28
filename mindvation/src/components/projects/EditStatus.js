import React, {Component} from 'react';
import {Header, Label, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Slider from '../common/Slider';
import PropTypes from 'prop-types';

class EditStatus extends Component {

    changeStatus = (status, progress) => {
        if (status !== "inProgress" && status === this.props.status.status) return;
        if (status === "inProgress" && progress === this.props.status.percent) return;
        if (status === "done") {
            progress = 100;
        }
        if (status === "reopen") {
            progress = 0;
        }
        if (progress === 100) {
            status = "done";
        }
        this.props.changeStatus && this.props.changeStatus(status, progress);
    };

    render() {
        const {isStory, status = {}} = this.props;
        return (
            <div className="edit-status-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='Status'
                        defaultMessage='Status'
                    />
                </Header>
                <Label className="edit-status-rag"
                       color={status.ragStatus === "R" ? "red" : status.ragStatus === "A" ? "yellow" : "green"}>
                    {status.ragStatus === "R" ? "Red" : status.ragStatus === "A" ? "Amber" : "Green"}
                </Label>
                <div className="components-item">
                    <Button className={status.status === "new" ? "status-indicator" : ""} compact
                            disabled={true}>
                        <FormattedMessage
                            id='new'
                            defaultMessage='New'
                        />
                    </Button>
                    <Button className={status.status === "inProgress" ? "status-indicator" : ""} compact
                            onClick={() => this.changeStatus('inProgress')}
                            disabled={status.status === "done" || status.status === "close" || status.status === "hold"}>
                        <FormattedMessage
                            id='inProgress'
                            defaultMessage='In Progress'
                        />
                    </Button>
                    <Button className={status.status === "done" ? "status-indicator" : ""} compact
                            onClick={() => this.changeStatus('done')}>
                        <FormattedMessage
                            id='done'
                            defaultMessage='Done'
                        />
                    </Button>
                    {isStory ? <span>
                        <Button className={status.status === "close" ? "status-indicator" : ""} compact
                                onClick={() => this.changeStatus('close')}>
                            <FormattedMessage
                                id='close'
                                defaultMessage='Close'
                            />
                        </Button>
                        <Button className={status.status === "hold" ? "status-indicator" : ""} compact
                                onClick={() => this.changeStatus('hold')}>
                            <FormattedMessage
                                id='hold'
                                defaultMessage='Hold'
                            />
                        </Button>
                    </span> : null}
                    <Button className={status.status === "reopen" ? "status-indicator" : ""} compact
                            onClick={() => this.changeStatus('reopen')}>
                        <FormattedMessage
                            id='reopen'
                            defaultMessage='Reopen'
                        />
                    </Button>
                </div>
                {status.status === "inProgress" ? <div className="components-item edit-status-progress">
                    <Slider className="edit-status-slider"
                            value={status.percent}
                            ref={node => this.progressNode = node}/>
                    <Button compact className="edit-status-confirm"
                            onClick={() => this.changeStatus('inProgress', this.progressNode.getValue())}>
                        <FormattedMessage
                            id='confirm'
                            defaultMessage='Confirm'
                        />
                    </Button>
                </div> : null}
            </div>
        );
    }
}

EditStatus.propTypes = {
    isStory: PropTypes.bool,
    changeStatus: PropTypes.func,
    status: PropTypes.object
};

export default EditStatus;