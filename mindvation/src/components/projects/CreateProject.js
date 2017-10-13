import React, {Component} from 'react';
import {Button, Modal, Divider} from 'semantic-ui-react';
import BasicInfo from './create/BasicInfo';
import AdditionalInfo from './create/AdditionalInfo';
import OptionalItem from './create/OptionalItem';
import {createProject} from '../../actions/projects_action';
import {clearTempChecklist} from '../../actions/checklist_action';
import {checkCompleted} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

let basicModule, optionalModule, AdditionalModule;
let mandatoryFile = ["projectName", "description"];

class CreateProject extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempChecklist());
    };

    handleProjectInfo = (projectInfo) => {
        return Object.assign(projectInfo, {
            "progress": "0%",
            "storyPoints": 0,
            "CRCost": 0,
            "SPsCost": 0,
            "CRRate": "0%"
        })
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
            <div>
                <Button color='blue' onClick={() => this.openModal()}>
                    <FormattedMessage
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
                        <FormattedMessage
                            id='createNewProject'
                            defaultMessage='Create New Project'
                        />
                    </Modal.Header>
                    <BasicInfo ref={node => {
                        basicModule = node
                    }}/>
                    <Divider/>
                    <AdditionalInfo ref={node => {
                        AdditionalModule = node
                    }}/>
                    <Divider/>
                    <OptionalItem dispatch={dispatch} ref={node => {
                        optionalModule = node
                    }}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.newProject()}>
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
