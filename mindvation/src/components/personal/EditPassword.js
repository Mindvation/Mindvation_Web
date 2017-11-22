import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../common/Input';
import {checkCompleted} from '../../util/CommUtil';

const mandatoryFile = ["originalPwd", "newPwd", "confirmPwd"];

class EditEmployee extends Component {
    state = {modalOpen: false, checked: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    editPassword = () => {
        this.setState({
            checked: true
        });
        const passwordInfo = {
            "originalPwd": this.originalPwdNode.getWrappedInstance().getValue(),
            "newPwd": this.newPwdNode.getWrappedInstance().getValue(),
            "confirmPwd": this.confirmPwdNode.getWrappedInstance().getValue()
        };
        let flag = checkCompleted(mandatoryFile, passwordInfo) && passwordInfo.newPwd === passwordInfo.confirmPwd;
        if (flag) this.closeModal();
    };

    render() {
        const {modalOpen, checked} = this.state;
        return (
            <div>
                <div className="edit-password-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='editPassword'
                        defaultMessage='Edit Password'
                    />
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header className="modal-title-border">
                        <FormattedMessage
                            id='editPassword'
                            defaultMessage='Edit Password'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Input label="Original Password"
                               type='password'
                               checked={checked}
                               required={true}
                               ref={node => this.originalPwdNode = node}
                        />
                        <Input label="New Password"
                               type='password'
                               checked={checked}
                               required={true}
                               ref={node => this.newPwdNode = node}
                        />
                        <Input label="Confirm New Password"
                               type='password'
                               checked={checked}
                               required={true}
                               ref={node => this.confirmPwdNode = node}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.editPassword()}>
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

export default EditEmployee;