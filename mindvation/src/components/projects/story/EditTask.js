import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import {editTask} from '../../../actions/task_action';
import {dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

let taskDesc, assignTo, startEndDate;

class EditTask extends Component {
    state = {modalOpen: false, taskInfo: {}};

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

    openModal = (taskInfo) => this.setState({modalOpen: true, taskInfo: taskInfo});

    closeModal = () => this.setState({modalOpen: false});

    updateTask = () => {
        const task = {
            "description": taskDesc.getWrappedInstance().getValue(),
            "assignee": assignTo.getWrappedInstance().getValue(),
            "lastUpdateDate": dateFormat(new Date(), "yyyy-MM-dd hh:mm"),
        };
        this.setState({modalOpen: false});
        this.props.dispatch(editTask(Object.assign(this.state.taskInfo, task)));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editTask'
                            defaultMessage='Edit Task'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TextArea label="Description" icon="book"
                                  ref={node => {
                                      taskDesc = node
                                  }}
                                  defaultValue={this.state.taskInfo.description}
                        />
                        <Select icon="user" options={global.dummyData.assignOptions} label="Assign To" search={true}
                                placeHolder="assignToPlaceHolderDesc"
                                ref={node => {
                                    assignTo = node
                                }}
                                defaultValue={this.state.taskInfo.assignee}
                        />
                        <DatePicker icon="clock" label="Start / End Date"
                                    range={true}
                                    ref={node => {
                                        startEndDate = node
                                    }}
                                    defaultValue={[this.state.taskInfo.startDate, this.state.taskInfo.endDate]}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.updateTask()}>
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

export default EditTask;
