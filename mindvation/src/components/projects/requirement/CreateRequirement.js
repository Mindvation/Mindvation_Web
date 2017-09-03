import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import OptionalItem from '../create/OptionalItem';
import {createRequirement, clearTempRequirement} from '../../../actions/requirement_action';
import {createRequirements} from '../../../actions/requirements_action';
import {clearTempTask} from '../../../actions/task_action';
import {checkCompleted} from '../../../util/CommUtil';

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
        this.props.dispatch(clearTempTask());
        this.openModal();
    };

    newRequirement = () => {

        let basicInfo = basicModule.getInfo();
        let optionalInfo = optionalModule.getInfo();
        let additionalInfo = AdditionalModule.getInfo();
        let requirementInfo = Object.assign(basicInfo, additionalInfo, optionalInfo);
        let flag = checkCompleted(mandatoryFile, requirementInfo);
        if (flag) {
            this.props.dispatch(createRequirements(requirementInfo));
            this.closeModal();
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, dispatch} = this.props;
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
                    <BasicInfo ref={node => {
                        basicModule = node
                    }}/>
                    <AdditionalInfo requirement={requirement} ref={node => {
                        AdditionalModule = node
                    }}/>
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