import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import {addChecklist} from '../../../actions/checklist_action';
import {dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {getStaffId, getUser} from '../../../util/UserStore';
import Image from '../../common/Image';

let checklistDesc, assignTo;

class AddChecklist extends Component {
    state = {modalOpen: false};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    createChecklist = () => {
        const checklist = {
            "description": checklistDesc.getWrappedInstance().getValue(),
            "assignee": assignTo.getWrappedInstance().getFullValue(),
            "assigner": {
                text: getUser().name,
                value: getStaffId()
            },
            "createDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "lastUpdateDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "status": "new"
        };
        this.setState({modalOpen: false});
        this.props.dispatch(addChecklist(checklist));
    };

    render() {
        const {modalOpen} = this.state;
        const {assignOption} = this.props;
        return (
            <div className="model-main-container">
                <div className="model-pop-button" onClick={() => this.openModal()}>
                    + <FormattedMessage
                    id='addChecklist'
                    defaultMessage='Add Checklist'
                />
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header className="modal-title-border">
                        <Image name="checklist"/>
                        <FormattedMessage
                            id='addChecklist'
                            defaultMessage='Add Checklist'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TextArea label="Description" icon="book"
                                  ref={node => {
                                      checklistDesc = node
                                  }}/>
                        <Select icon="user" options={assignOption} label="Assign To" search={true}
                                placeHolder="assignToPlaceHolderDesc"
                                ref={node => {
                                    assignTo = node
                                }}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.createChecklist()}>
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

export default AddChecklist;
