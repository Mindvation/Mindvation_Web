import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../create/BasicInfo';
import {checkValid, getDataInfo} from '../../../util/CommUtil';
import {updateProjectBasic} from '../../../actions/project_action';

class EditBasicInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let basicInfo = this.basicModule.getInfo();
        let flag = checkValid(basicInfo);
        if (flag) {
            basicInfo = getDataInfo(basicInfo);
            basicInfo.projectId = this.props.project.projectId;
            this.props.dispatch(updateProjectBasic(basicInfo, () => this.closeModal()));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {project, disabled} = this.props;
        return (
            <div className="read-only-component">
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editBasicInfo'
                        defaultMessage='Edit Basic info'
                    />
                </div>}
                <div className="edit-detail-info">
                    <ReadOnly title="Project Name" value={project.projectName}/>
                    <ReadOnly title="Description" type="html"
                              value={project.description}/>
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <BasicInfo
                        info={project}
                        ref={node => {
                            this.basicModule = node
                        }}
                        isEdit={true}
                    />
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.update()}>
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

export default EditBasicInfo;
