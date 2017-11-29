import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import DepartmentInfo from './DepartmentInfo';
import {updateDepartment} from '../../../actions/department_action';
import Image from '../../common/Image';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

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
        let flag = checkValid(departmentInfo);
        if (flag) {
            departmentInfo = getDataInfo(departmentInfo);
            this.props.dispatch(updateDepartment(departmentInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, departmentInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header className="modal-title-border">
                        <Image name="project"/>
                        <FormattedMessage
                            id='editDepartment'
                            defaultMessage='Edit Department'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <DepartmentInfo info={departmentInfo} ref={node => this.departmentInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateDepartmentDetail()}>
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