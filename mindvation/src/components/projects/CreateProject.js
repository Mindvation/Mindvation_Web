import React, {Component} from 'react';
import {Button, Modal, Divider} from 'semantic-ui-react';
import BasicInfo from './create/BasicInfo';
import AdditionalInfo from './create/AdditionalInfo';
import OptionalItem from './create/OptionalItem';
import {createProject} from '../../actions/projects_action';
import {clearTempChecklist} from '../../actions/checklist_action';
import {checkCompleted} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import Image from '../common/Image';

let basicModule, optionalModule, AdditionalModule;
let mandatoryFile = ["projectName", "description"];

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
        let flag = checkCompleted(mandatoryFile, projectInfo);
        if (flag) {
            //this.handleProjectInfo(projectInfo);
            this.props.dispatch(createProject(projectInfo, function () {
                this.props.dispatch(clearTempChecklist());
                this.setState({modalOpen: false});
            }.bind(this)));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {dispatch} = this.props;
        return (
            <div className="model-main-container">
                <div className="create-project-button" onClick={() => this.openModal()}>
                    + <FormattedMessage
                    id='createProject'
                    defaultMessage='Create Project'
                />
                </div>
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
            </div>
        );
    }
}

export default CreateProject;
