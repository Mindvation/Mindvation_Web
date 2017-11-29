import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import DepartmentInfo from './DepartmentInfo';
import {FormattedMessage} from 'react-intl';
import {createDepartment} from '../../../actions/department_action';
import MVImage from "../../common/Image";
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateDepartment extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newDepartment = () => {
        let departmentInfo = this.departmentInfoNode.getInfo();
        let flag = checkValid(departmentInfo);
        if (flag) {
            departmentInfo = getDataInfo(departmentInfo);
            this.props.dispatch(createDepartment(departmentInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="confirm-button create-project-button" onClick={() => this.openModal()}>
                    + <FormattedMessage
                    id='createDepartment'
                    defaultMessage='Create Department'
                />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <MVImage name="project"/>
                        <FormattedMessage
                            id='createDepartment'
                            defaultMessage='Create Department'
                        />
                    </Modal.Header>
                    <DepartmentInfo ref={(node) => this.departmentInfoNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newDepartment()}>
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

export default CreateDepartment;
