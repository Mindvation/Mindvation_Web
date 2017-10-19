import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import {editChecklist} from '../../../actions/checklist_action';
import {dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

let checklistDesc, assignTo;

class EditChecklist extends Component {
    state = {modalOpen: false, checklistInfo: {}};

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

    openModal = (checklistInfo) => this.setState({modalOpen: true, checklistInfo: checklistInfo});

    closeModal = () => this.setState({modalOpen: false});

    updateChecklist = () => {
        const checklist = {
            "description": checklistDesc.getWrappedInstance().getValue(),
            "assignee": assignTo.getWrappedInstance().getFullValue(),
            "assigner": {
                text: "Frank",
                value: "m2"
            },
            "lastUpdateDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
        };
        this.setState({modalOpen: false});
        this.props.dispatch(editChecklist(Object.assign(this.state.checklistInfo, checklist)));
    };

    render() {
        const {assignOption} = this.props;
        const {modalOpen} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editChecklist'
                            defaultMessage='Edit Checklist'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TextArea label="Description" icon="book"
                                  ref={node => {
                                      checklistDesc = node
                                  }}
                                  defaultValue={this.state.checklistInfo.description}
                        />
                        <Select icon="user" options={assignOption} label="Assign To" search={true}
                                placeHolder="assignToPlaceHolderDesc"
                                ref={node => {
                                    assignTo = node
                                }}
                                defaultValue={this.state.checklistInfo.assignee ? this.state.checklistInfo.assignee.value : ''}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.updateChecklist()}>
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

export default EditChecklist;
