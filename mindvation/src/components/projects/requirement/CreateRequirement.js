import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import OptionalItem from '../create/OptionalItem';

class CreateRequirement extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <Button className="create-requirement-button" compact basic onClick={() => this.openModal()}>
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
                    <BasicInfo/>
                    <AdditionalInfo/>
                    <OptionalItem/>
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

export default CreateRequirement;
