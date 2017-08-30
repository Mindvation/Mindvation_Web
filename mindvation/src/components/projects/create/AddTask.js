import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import {addTask} from '../../../actions/task_action';
import {dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

let taskDesc, assignTo;

class AddTask extends Component {
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

    createTask = () => {
        const task = {
            "description": taskDesc.getWrappedInstance().getValue(),
            "Assignee": assignTo.getWrappedInstance().getValue(),
            "assigner": "Leaders",
            "createDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "lastUpdateDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
            "status": "new"
        };
        this.setState({modalOpen: false});
        this.props.dispatch(addTask(task));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <Button color='blue' onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='addTask'
                        defaultMessage='Add Task'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='addTask'
                            defaultMessage='Add Task'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TextArea label="Description" icon="book"
                                  ref={node => {
                                      taskDesc = node
                                  }}/>
                        <Select icon="user" options={global.dummyData.assignOptions} label="Assign To" search={true}
                                placeHolder="assignToPlaceHolderDesc"
                                ref={node => {
                                    assignTo = node
                                }}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.createTask()}>
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

export default AddTask;
