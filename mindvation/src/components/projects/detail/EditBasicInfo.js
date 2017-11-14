import React, {Component} from 'react';
import {Header, Icon, Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../create/BasicInfo';
import {checkCompleted} from '../../../util/CommUtil';
import {updateProjectBasic} from '../../../actions/project_action';

let basicModule;
let mandatoryFile = ["projectName", "description"];

class EditBasicInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let basicInfo = basicModule.getInfo();
        let flag = checkCompleted(mandatoryFile, basicInfo);
        if (flag) {
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
                    <ReadOnly icon="product hunt" title="Project Name" value={project.projectName}/>
                    <ReadOnly icon="book" title="Description"
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
                            basicModule = node
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
