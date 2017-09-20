import React, {Component} from 'react';
import {Header, Modal, Icon, Button} from 'semantic-ui-react';
import TextArea from '../../../common/TextArea';
import Silder from '../../../common/Slider';
import {FormattedMessage} from 'react-intl';

class EditProgress extends Component {

    state = {modalOpen: false, module: ''};

    openModal = (module) => this.setState({modalOpen: true, module: module});

    closeModal = () => this.setState({modalOpen: false});

    confirm = () => {
        let tempModule = this.state.module;
        tempModule.percent = 45;
        if (this.props.updateProgress) {
            this.props.updateProgress(tempModule);
        }
        this.closeModal();
    };

    render() {
        const {module, modalOpen} = this.state;
        return (
            <Modal
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                open={modalOpen}
                size='large'>
                <Modal.Header>
                    <FormattedMessage
                        id='customModuleTypeSelection'
                        defaultMessage='Custom Module Type Selection'
                    />
                </Modal.Header>
                <Modal.Content>
                    <Header as='h4'>
                        <Icon name="cube"/>
                        <Header.Content className="input-label">
                            <FormattedMessage
                                id='moduleType'
                                defaultMessage='Module Type'
                            />
                        </Header.Content>
                    </Header>
                    <Silder/>
                    <TextArea label="Module Name" icon="product hunt"
                              ref={node => {
                                  this.comment = node
                              }}
                              placeHolder="moduleNamePhDesc"
                    />
                </Modal.Content><Modal.Actions>
                <Button secondary onClick={() => this.closeModal()}>
                    <FormattedMessage
                        id='cancel'
                        defaultMessage='Cancel'
                    />
                </Button>
                <Button primary onClick={() => this.confirm()}>
                    <FormattedMessage
                        id='confirm'
                        defaultMessage='Confirm'
                    />
                </Button>
            </Modal.Actions>
            </Modal>
        );
    }
}

export default EditProgress;
