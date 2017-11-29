import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import EmployeeInfo from './EmployeeInfo';
import {FormattedMessage} from 'react-intl';
import {createEmployee} from '../../../actions/employee_action';
import Image from '../../common/Image';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateEmployee extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newEmployee = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        let flag = checkValid(employeeInfo);
        if (flag) {
            employeeInfo = getDataInfo(employeeInfo);
            this.props.dispatch(createEmployee(employeeInfo, this.closeModal));
        }
    };

    render() {
        const {department} = this.props;
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="confirm-button create-project-button" onClick={() => this.openModal()}>
                    + <FormattedMessage
                    id='createEmployee'
                    defaultMessage='Create Employee'
                />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <Image name="project"/>
                        <FormattedMessage
                            id='createEmployee'
                            defaultMessage='Create Employee'
                        />
                    </Modal.Header>
                    <EmployeeInfo ref={(node) => this.employeeInfoNode = node} department={department}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newEmployee()}>
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

export default CreateEmployee;
