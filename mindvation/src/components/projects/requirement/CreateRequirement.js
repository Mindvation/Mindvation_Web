import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import OptionalItem from '../create/OptionalItem';
import {clearTempRequirement} from '../../../actions/requirement_action';
import {createRequirement} from '../../../actions/requirements_action';
import {clearTempChecklist} from '../../../actions/checklist_action';
import {checkCompleted} from '../../../util/CommUtil';
import {
    Link
} from 'react-router-dom';

let basicModule, optionalModule, AdditionalModule;
let mandatoryFile = ["summary", "description"];

class CreateRequirement extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.props.dispatch(clearTempRequirement());
        this.setState({modalOpen: false});
    };

    createTempRequirement = () => {
        this.props.dispatch(clearTempChecklist());
        this.props.dispatch(clearTempRequirement());
        this.openModal();
    };

    newRequirement = () => {
        let basicInfo = basicModule.getInfo();
        let optionalInfo = optionalModule.getInfo();
        let additionalInfo = AdditionalModule.getInfo();
        let requirementInfo = Object.assign(basicInfo, additionalInfo, optionalInfo);
        requirementInfo.comments = [];
        let flag = checkCompleted(mandatoryFile, requirementInfo);
        if (flag) {
            /*this.props.dispatch(createRequirements(requirementInfo));
            let timer = setTimeout(() => {
                this.closeModal();
                timer && clearTimeout(timer);
            }, 0);*/
            requirementInfo.projectId = this.props.project.projectId;
            this.props.dispatch(createRequirement(requirementInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, dispatch, project} = this.props;
        return (
            <div>
                <Button className="create-requirement-button" compact basic
                        onClick={() => this.createTempRequirement()}>
                    <Icon name="plus circle"/>
                    <FormattedMessage
                        id='createRequirement'
                        defaultMessage='Create Requirement'
                    />
                </Button>
                <Link style={{border: '1px solid #1b1c1d'}} className="create-requirement-button"
                      to={`/home/MVPDashboard`}>
                    MVP Dashboard
                </Link>
                <Link style={{border: '1px solid #1b1c1d', marginLeft: '2em'}} className="create-requirement-button"
                      to={`/home/MyMVPDashboard`}>
                    My MVP Dashboard
                </Link>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        <FormattedMessage
                            id='createRequirement'
                            defaultMessage='Create Requirement'
                        />
                    </Modal.Header>
                    <BasicInfo
                        ref={node => {
                            basicModule = node
                        }}
                    />
                    <AdditionalInfo
                        dispatch={dispatch}
                        requirement={requirement}
                        ref={node => {
                            AdditionalModule = node
                        }}
                        project={project}/>
                    <OptionalItem
                        dispatch={dispatch}
                        ref={node => {
                            optionalModule = node
                        }}/>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.newRequirement()}>
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

export default CreateRequirement;
