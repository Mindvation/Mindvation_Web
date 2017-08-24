import React, {Component} from 'react';
import {Button, Modal, Divider} from 'semantic-ui-react';
import BasicInfo from './create/BasicInfo';
import AdditionalInfo from './create/AdditionalInfo';
import OptionalItem from './create/OptionalItem';
import {createProject} from '../../actions/projects_action';
import {celarTempChecklist} from '../../actions/checklist_action';
import {isEmpty} from '../../util/CommUtil';

let basicModule, optionalModule, AdditionalModule;
let mandatoryFile = ["projectName", "description"];

class CreateProject extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    checkCompleted = (info) => {
        let flag = true;
        mandatoryFile.some((result) => {
            if (isEmpty(info[result])) {
                flag = false;
                return true;
            }
        });
        return flag;
    };

    newProject = () => {

        let basicInfo = basicModule.getInfo();
        let optionalInfo = optionalModule.getInfo();
        let additionalInfo = AdditionalModule.getInfo();
        let projectInfo = Object.assign(basicInfo, additionalInfo, optionalInfo);
        let flag = this.checkCompleted(projectInfo);
        if (flag) {
            this.props.dispatch(createProject(projectInfo));
            this.props.dispatch(celarTempChecklist());
            this.setState({modalOpen: false});
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {dispatch} = this.props;
        return (
            <div>
                <Button color='blue' onClick={() => this.openModal()}>+ Create Project</Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>Create New Project</Modal.Header>
                    <BasicInfo ref={node => {
                        basicModule = node
                    }}/>
                    <Divider/>
                    <AdditionalInfo ref={node => {
                        AdditionalModule = node
                    }}/>
                    <OptionalItem dispatch={dispatch} ref={node => {
                        optionalModule = node
                    }}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            Cancel
                        </Button>
                        <Button primary onClick={() => this.newProject()}>
                            Confirm
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default CreateProject;
