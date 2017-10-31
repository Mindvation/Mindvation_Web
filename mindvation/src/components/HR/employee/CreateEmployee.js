import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import EmployeeInfo from './EmployeeInfo';
import {FormattedMessage} from 'react-intl';
import {createEmployee} from '../../../actions/employee_action';

class CreateEmployee extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newEmployee = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        this.props.dispatch(createEmployee(employeeInfo, this.closeModal));
    };

    render() {
        const {department} = this.props;
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createEmployee'
                            defaultMessage='Create Employee'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header>
                            <FormattedMessage
                                id='createEmployee'
                                defaultMessage='Create Employee'
                            />
                        </Modal.Header>
                        <EmployeeInfo ref={(node) => this.employeeInfoNode = node} department={department}/>
                        <Modal.Actions>
                            <Button secondary onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button primary onClick={() => this.newEmployee()}>
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

export default CreateEmployee;
