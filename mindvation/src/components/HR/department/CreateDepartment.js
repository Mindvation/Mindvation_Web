import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import DepartmentInfo from './DepartmentInfo';
import {FormattedMessage} from 'react-intl';
import {createDepartment} from '../../../actions/department_action';

class CreateDepartment extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newDepartment = () => {
        let departmentInfo = this.departmentInfoNode.getInfo();
        this.props.dispatch(createDepartment(departmentInfo));
        this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createDepartment'
                            defaultMessage='Create Department'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header>
                            <FormattedMessage
                                id='createDepartment'
                                defaultMessage='Create Department'
                            />
                        </Modal.Header>
                        <DepartmentInfo ref={(node) => this.departmentInfoNode = node}/>
                        <Modal.Actions>
                            <Button secondary onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button primary onClick={() => this.newDepartment()}>
                                <FormattedMessage
                                    id='confirm'
                                    defaultMessage='Confirm'
                                />
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CreateDepartment;
