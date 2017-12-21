import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {checkValid, getDataInfo} from '../../util/CommUtil';
import Simditor from '../common/Simditor';
import AddTags from "../../containers/tag_container";
import Select from '../common/Select';
import {staffStatusOptions} from '../../res/data/dataOptions';

class CreateIssue extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newIssue = () => {
        /*let issueInfo = {
            name: this.nameNode.getValue()
        };
        let flag = checkValid(issueInfo);
        if (flag) {
            issueInfo = getDataInfo(issueInfo);
        }*/
        this.closeModal();
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
                                  ref={node => this.nameNode = node}
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
                        <Select options={staffStatusOptions} label="Status"
                                ref={node => this.statusNode = node}
                        />
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
