import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import EmployeeInfo from './DepartmentInfo';
import {updateEmployee} from '../../../actions/employee_action';

class EditDepartment extends Component {
    state = {modalOpen: false, employeeInfo: {}};

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

    openModal = (employeeInfo) => this.setState({modalOpen: true, employeeInfo: employeeInfo});

    closeModal = () => this.setState({modalOpen: false});

    updateChecklist = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        employeeInfo.id = this.state.employeeInfo.id;
        this.props.dispatch(updateEmployee(employeeInfo));
        this.closeModal();
    };

    render() {
        const {modalOpen, employeeInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editEmployee'
                            defaultMessage='Edit Employee'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <EmployeeInfo info={employeeInfo} ref={node => this.employeeInfoNode = node}/>
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

export default EditDepartment;