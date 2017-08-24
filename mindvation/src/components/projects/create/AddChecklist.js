import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import {addChecklist} from '../../../actions/checklist_action';
import {dateFormat} from '../../../util/CommUtil';

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
        const checkList = {
            "description": checklistDesc.getValue(),
            "follower": assignTo.getValue(),
            "assigner": "Leaders",
            "createDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "lastUpdateDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "status": "Open"
        };
        this.setState({modalOpen: false});
        this.props.dispatch(addChecklist(checkList));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <Button color='blue' onClick={() => this.openModal()}>Add Checklist</Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>Add Checklist</Modal.Header>
                    <Modal.Content>
                        <TextArea label="Description" icon="book"
                                  ref={node => {
                                      checklistDesc = node
                                  }}/>
                        <Select icon="user" options={global.dummyData.assignOptions} label="Assign To" search={true}
                                placeHolder="Assign To"
                                ref={node => {
                                    assignTo = node
                                }}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            Cancel
                        </Button>
                        <Button primary onClick={() => this.createChecklist()}>
                            Confirm
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default AddChecklist;
