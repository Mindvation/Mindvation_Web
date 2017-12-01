import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import BasicInfo from './create/BasicInfo';
import AdditionalInfo from './create/AdditionalInfo';
import OptionalItem from './create/OptionalItem';
import {createProject} from '../../actions/projects_action';
import {clearTempChecklist} from '../../actions/checklist_action';
import {checkValid, getDataInfo} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import Image from '../common/Image';
import SuccessAlert from './SuccessAlert';

let basicModule, optionalModule, AdditionalModule;

class CreateProject extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempChecklist());
    };

    newProject = () => {
        let basicInfo = basicModule.getInfo();
        let optionalInfo = optionalModule.getInfo();
        let additionalInfo = AdditionalModule.getInfo();
        let projectInfo = Object.assign(basicInfo, additionalInfo, optionalInfo);
        let flag = checkValid(projectInfo);
        if (flag) {
            //this.handleProjectInfo(projectInfo);
            projectInfo = getDataInfo(projectInfo);
            this.props.dispatch(createProject(projectInfo, (id) => {
                this.successAlert(id)
            }));
        }
    };

    successAlert = (id) => {
        this.closeModal();
        this.successAlertNode.openModal(id);
    };

    render() {
        const {modalOpen} = this.state;
        const {dispatch} = this.props;
        return (
            <div className="model-main-container">
                <Button className="confirm-button create-project-button" onClick={() => this.openModal()}>
                    + <FormattedMessage
                    id='createProject'
                    defaultMessage='Create Project'
                />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        <Image name="project"/>
                        <FormattedMessage
                            id='createNewProject'
                            defaultMessage='Create New Project'
                        />
                    </Modal.Header>
                    <BasicInfo ref={node => {
                        basicModule = node
                    }}/>
                    <AdditionalInfo ref={node => {
                        AdditionalModule = node
                    }}/>
                    <OptionalItem dispatch={dispatch} ref={node => {
                        optionalModule = node
                    }}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newProject()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <SuccessAlert ref={node => this.successAlertNode = node}/>
            </div>
        );
    }
}

export default CreateProject;
