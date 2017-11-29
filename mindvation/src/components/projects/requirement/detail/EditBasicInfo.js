import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../BasicInfo';
import {checkValid, getDataInfo} from '../../../../util/CommUtil';
import {updateRequirementBasic} from '../../../../actions/requirement_action';

let basicModule;
let mandatoryFile = ["summary", "description"];

class EditBasicInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let basicInfo = basicModule.getInfo();
        let flag = checkValid(basicInfo);
        if (flag) {
            basicInfo = getDataInfo(basicInfo);
            basicInfo.projectId = this.props.requirement.projectId;
            basicInfo.reqId = this.props.requirement.reqId;
            this.props.dispatch(updateRequirementBasic(basicInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, disabled} = this.props;
        return (
            <div className="read-only-component">
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editBasicInfo'
                        defaultMessage='Edit Basic info'
                    />
                </div>}
                <div className="edit-detail-info">
                    <ReadOnly title="Summary" value={requirement.summary}/>
                    <ReadOnly title="Description" type="html"
                              value={requirement.description}/>
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <BasicInfo
                        info={requirement}
                        ref={node => {
                            basicModule = node
                        }}
                        isEdit={true}
                    />
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.update()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditBasicInfo;
