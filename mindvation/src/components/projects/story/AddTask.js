import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import TextArea from '../../common/TextArea';
import Input from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import SelectAttach from './SelectAttach';
import {addTask} from '../../../actions/story_action';
import {FormattedMessage} from 'react-intl';
import {retrieveStaff} from '../../../util/Service';
import {getStaffId} from '../../../util/UserStore';
import MVImage from "../../common/Image";
import {checkValid, getDataInfo} from '../../../util/CommUtil';

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
        let task = {
            projectId: this.props.story.projectId,
            storyId: this.props.story.storyId,
            description: this.taskDesc.getWrappedInstance().getValue(),
            startDate: this.startEndDate.getValue() ? this.startEndDate.getValue()[0] : "",
            endDate: this.startEndDate.getValue() ? this.startEndDate.getValue()[1] : "",
            workload: this.workloadNode.getWrappedInstance().getValue(),
            assigner: getStaffId(),
            model: this.modelNode.getInfo(),
        };
        let flag = checkValid(task);
        if (flag) {
            task = getDataInfo(task);
            this.props.dispatch(addTask(task, this.closeModal))
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {story} = this.props;
        return (
            <div>
                <Button className="confirm-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='addTask'
                        defaultMessage='Add Task'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header className="modal-title-border">
                        <MVImage name="project"/>
                        <FormattedMessage
                            id='addTask'
                            defaultMessage='Add Task'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <div className="model-container">
                            <TextArea label="Description"
                                      required={true}
                                      ref={node => {
                                          this.taskDesc = node
                                      }}/>
                            <DatePicker label="Start / End Date"
                                        range={true}
                                        required={true}
                                        ref={node => {
                                            this.startEndDate = node
                                        }}
                            />
                            <Input label="Workload" type="number"
                                   required={true}
                                   ref={node => {
                                       this.workloadNode = node
                                   }}
                            />
                            <div className="components-item item-horizontal align-right">
                                <div className='field-title'>
                                    <FormattedMessage
                                        id="taskAttachments"
                                        defaultMessage='Task Attachments'
                                    />
                                </div>
                                <div className="input-content add-task">
                                    <SelectAttach taskDeliveries={story.taskDeliveries}
                                                  ref={node => this.modelNode = node}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.createTask()}>
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
