import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import EmployeeInfo from './EmployeeInfo';
import {updateEmployee, rtrvStaffDetail} from '../../../actions/employee_action';

class EditEmployee extends Component {
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

    openModal = (staffId) => {
        this.props.dispatch(rtrvStaffDetail(staffId, function (employee) {
            this.setState({modalOpen: true, employeeInfo: employee});
        }.bind(this)));
    };

    closeModal = () => this.setState({modalOpen: false});

    updateEmployeeInfo = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        employeeInfo.id = this.state.employeeInfo.id;
        this.props.dispatch(updateEmployee(employeeInfo, this.closeModal));
    };

    render() {
        const {modalOpen, employeeInfo} = this.state;
        const {department} = this.props;
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
                        <EmployeeInfo isEdit={true} info={employeeInfo} ref={node => this.employeeInfoNode = node}
                                      department={department}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.updateEmployeeInfo()}>
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

export default EditEmployee;