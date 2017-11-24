import React, {Component} from 'react';
import {Button, Modal, Message} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../common/Input';
import {checkCompleted} from '../../util/CommUtil';
import {changePassword} from '../../actions/user_action';
import {getStaffId} from '../../util/UserStore';

const mandatoryFile = ["originalPwd", "newPwd", "confirmPwd"];

class EditEmployee extends Component {
    state = {modalOpen: false, errorMessage: ''};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    editPassword = () => {
        const passwordInfo = {
            originalPwd: this.originalPwdNode.getWrappedInstance().getValue(),
            newPwd: this.newPwdNode.getWrappedInstance().getValue(),
            confirmPwd: this.confirmPwdNode.getWrappedInstance().getValue()
        };
        let flag = checkCompleted(mandatoryFile, passwordInfo);
        /*&& passwordInfo.newPwd === passwordInfo.confirmPwd;*/
        if (flag) {
            if (passwordInfo.newPwd !== passwordInfo.confirmPwd) {
                this.setState({
                    errorMessage: <FormattedMessage
                        id='passwordNotMatch'
                        defaultMessage="Password doesn't match the confirmation"
                    />
                });
                return;
            }
            this.setState({
                errorMessage: ''
            });
            this.props.dispatch(changePassword({
                "staffId": getStaffId(),
                "beforePassword": passwordInfo.originalPwd,
                "afterPassword": passwordInfo.newPwd
            }, this.closeModal))
        }
    };

    render() {
        const {modalOpen, errorMessage} = this.state;
        return (
            <div>
                <div className="edit-password-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='changePassword'
                        defaultMessage='Change Password'
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
                               required={true}
                               ref={node => this.originalPwdNode = node}
                        />
                        <Input label="New Password"
                               type='password'
                               required={true}
                               ref={node => this.newPwdNode = node}
                        />
                        <Input label="Confirm New Password"
                               type='password'
                               required={true}
                               ref={node => this.confirmPwdNode = node}
                        />
                        {errorMessage ?
                            <div className="components-item item-horizontal align-right">
                                <Message className="input-content" style={{textAlign: 'left'}} error>
                                    <p>{errorMessage}</p>
                                </Message>
                            </div> : null}
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