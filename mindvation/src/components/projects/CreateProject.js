import React, {Component} from 'react';
import {Button, Modal, Divider} from 'semantic-ui-react';
import BasicInfo from './create/BasicInfo';
import AdditionalInfo from './create/AdditionalInfo';
import {createProject} from '../../actions/projects_action';

let basicModule;

class CreateProject extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newProject = () => {
        let project = basicModule.getBasicInfo();
        this.props.dispatch(createProject(project));
        this.setState({modalOpen: false});
    };

    render() {
        const {modalOpen} = this.state;
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
                    <AdditionalInfo/>
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
