import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {editTask} from '../../../actions/task_action';
import {dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import TagList from './TagListForMember';

let taskDesc, assignTo;

const allTags = [{
    key: "T1",
    text: "React Native",
    color: "#7efefe"
}, {
    key: "T2",
    text: "PHP",
    color: "#ff9900"
}, {
    key: "T3",
    text: "Business Canvas",
    color: "#66cc33"
}, {
    key: "T4",
    text: "EPICs",
    color: "#0099cc"
}, {
    key: "T5",
    text: "BI",
    color: "#ffcc00"
}, {
    key: "T6",
    text: "Reactjs",
    color: "#7efefe"
}];

class ChooseMembers extends Component {
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
                    open={modalOpen}
                    className="choose-members-modal">
                    <Modal.Header>
                        Choose Members
                    </Modal.Header>
                    <Modal.Content>
                        <TagList tagList={allTags}/>
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

export default ChooseMembers;
