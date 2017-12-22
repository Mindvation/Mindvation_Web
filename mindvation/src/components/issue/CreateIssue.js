import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {checkValid, getDataInfo} from '../../util/CommUtil';
import Simditor from '../common/Simditor';
import AddTags from "../../containers/tag_container";
import Input from '../common/Input';
import {createIssue} from '../../actions/issue_action';

class CreateIssue extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newIssue = () => {
        let issueInfo = {
            description: this.descriptionNode.getValue(),
            tag: this.skillTagsNode.getWrappedInstance().getValue(),
            reward: this.rewardNode.getWrappedInstance().getValue()
        };
        let flag = checkValid(issueInfo);
        if (flag) {
            issueInfo = getDataInfo(issueInfo);
            this.props.dispatch(createIssue(this.props.subject, issueInfo, this.closeModal))
        }
        //this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <div className="edit-detail-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='newIssue'
                        defaultMessage='New Issue'
                    />
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <FormattedMessage
                            id='newIssue'
                            defaultMessage='New Issue'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Simditor label="Description"
                                  ref={node => this.descriptionNode = node}
                                  required={true}
                        />
                        <div className={"components-item item-horizontal align-right"}>
                            <div className='field-title'>
                                <FormattedMessage
                                    id='tags'
                                    defaultMessage='Tags'
                                />
                            </div>
                            <AddTags singleSelect={true} ref={node => this.skillTagsNode = node}/>
                        </div>
                        <Input label="Reward" required={true} type="number" step="1"
                               ref={node => this.rewardNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newIssue()}>
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

export default CreateIssue;
