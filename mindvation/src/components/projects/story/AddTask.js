import React, {Component} from 'react';
import {Button, Modal, Header, Icon} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import SelectAttach from './SelectAttach';
import {addTask} from '../../../actions/story_action';
import {FormattedMessage} from 'react-intl';
import {retrieveStaff} from '../../../util/Service';
import {getStaffId} from '../../../util/UserStore';

let taskDesc, assignTo, startEndDate, modelNode;

class AddTask extends Component {
    state = {modalOpen: false, assignOption: []};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    componentWillMount() {
        retrieveStaff(function (option) {
            this.setState({
                assignOption: option
            })
        }.bind(this))
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    createTask = () => {
        const task = {
            projectId: this.props.story.projectId,
            storyId: this.props.story.storyId,
            description: taskDesc.getWrappedInstance().getValue(),
            assignee: assignTo.getWrappedInstance().getValue(),
            startDate: startEndDate.getValue() ? startEndDate.getValue()[0] : "",
            endDate: startEndDate.getValue() ? startEndDate.getValue()[1] : "",
            assigner: getStaffId(),
            model: modelNode.getInfo(),
        };
        this.props.dispatch(addTask(task, this.closeModal))
        /*
                let tempStory = this.props.story;
                tempStory.tasks.push(task);
                this.setState({modalOpen: false});
                this.props.dispatch(updateStory(tempStory));*/
    };

    render() {
        const {modalOpen, assignOption} = this.state;
        const {story} = this.props;
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
                        <Select icon="user" options={assignOption} label="Assign To"
                                search={true}
                                placeHolder="assignToPlaceHolderDesc"
                                ref={node => {
                                    assignTo = node
                                }}/>
                        <DatePicker icon="clock" label="Start / End Date"
                                    range={true}
                                    ref={node => {
                                        startEndDate = node
                                    }}
                        />
                        <div className="components-item">
                            <Header as='h4'>
                                <Icon name="cube"/>
                                <Header.Content>
                                    <FormattedMessage
                                        id="taskAttachments"
                                        defaultMessage='Task Attachments'
                                    />
                                </Header.Content>
                            </Header>
                            <SelectAttach taskDeliveries={story.taskDeliveries} ref={node => modelNode = node}/>
                        </div>
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
