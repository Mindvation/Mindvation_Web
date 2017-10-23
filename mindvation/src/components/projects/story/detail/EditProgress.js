import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import TextArea from '../../../common/TextArea';
import Slider from '../../../common/Slider';
import {FormattedMessage} from 'react-intl';

class EditProgress extends Component {

    state = {modalOpen: false, task: {}};

    openModal = (task) => this.setState({modalOpen: true, task: task});

    closeModal = () => this.setState({modalOpen: false});

    confirm = () => {
        let tempTask = this.state.task;
        tempTask.model.percent = this.percentNode.getValue();
        tempTask.remark = this.comment.getWrappedInstance().getValue();
        if (this.props.updateProgress) {
            this.props.updateProgress(tempTask);
        }
    };

    render() {
        const {task, modalOpen} = this.state;
        return (
            <Modal
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                open={modalOpen}
                size='large'>
                <Modal.Header>
                    <FormattedMessage
                        id='editProgress'
                        defaultMessage='Edit Progress'
                    />
                </Modal.Header>
                <Modal.Content>
                    <Slider label="Progress" icon="percent" value={task.model ? task.model.percent : 0}
                            ref={node => this.percentNode = node}/>
                    <TextArea label="Comment" icon="commenting"
                              ref={node => {
                                  this.comment = node
                              }}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => this.closeModal()}>
                        <FormattedMessage
                            id='cancel'
                            defaultMessage='Cancel'
                        />
                    </Button>
                    <Button primary onClick={() => this.confirm()}>
                        <FormattedMessage
                            id='confirm'
                            defaultMessage='Confirm'
                        />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditProgress;
