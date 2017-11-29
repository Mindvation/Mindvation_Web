import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import OptionalItem from '../create/OptionalItem';
import {clearTempRequirement} from '../../../actions/requirement_action';
import {createRequirement} from '../../../actions/requirements_action';
import {clearTempChecklist} from '../../../actions/checklist_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';
import {hasAuth} from '../../../util/AuthUtil';

let basicModule, optionalModule, AdditionalModule;

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
        let flag = checkValid(requirementInfo);
        if (flag) {
            requirementInfo = getDataInfo(requirementInfo);
            requirementInfo.projectId = this.props.project.projectId;
            this.props.dispatch(createRequirement(requirementInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, dispatch, project} = this.props;
        return (
            <div>
                {hasAuth("createRequirement", project.authCode) ?
                    <div className="create-requirement-button"
                         onClick={() => this.createTempRequirement()}>
                        + <FormattedMessage
                        id='createRequirement'
                        defaultMessage='Create Requirement'
                    />
                    </div> : null}
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
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newRequirement()}>
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
