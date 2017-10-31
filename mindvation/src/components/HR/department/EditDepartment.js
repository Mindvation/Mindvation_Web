import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import DepartmentInfo from './DepartmentInfo';
import {updateDepartment} from '../../../actions/department_action';

class EditDepartment extends Component {
    state = {modalOpen: false, departmentInfo: {}};

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

    openModal = (departmentInfo) => this.setState({modalOpen: true, departmentInfo: departmentInfo});

    closeModal = () => this.setState({modalOpen: false});

    updateDepartmentDetail = () => {
        let departmentInfo = this.departmentInfoNode.getInfo();
        departmentInfo.id = this.state.departmentInfo.id;
        this.props.dispatch(updateDepartment(departmentInfo, this.closeModal));
    };

    render() {
        const {modalOpen, departmentInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editDepartment'
                            defaultMessage='Edit Department'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <DepartmentInfo info={departmentInfo} ref={node => this.departmentInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.updateDepartmentDetail()}>
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