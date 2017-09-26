import React, {Component} from 'react';
import {Header, Icon, Modal, Button, List} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import OptionalItem from '../../create/OptionalItem';
import {updateRequirement} from '../../../../actions/requirement_action';
import {clearTempChecklist} from '../../../../actions/checklist_action';
import DisplayFile from '../../../common/DisplayFile';

let optionalModule;

class EditOptionalInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempChecklist());
    };

    edit = () => {
        this.openModal();
    };

    update = () => {
        let optionalInfo = optionalModule.getInfo();
        this.props.dispatch(updateRequirement(optionalInfo));
        this.props.dispatch(clearTempChecklist());
        this.closeModal();
    };

    formatChecklists = () => {
        const {requirement} = this.props;
        if (requirement.checklists && requirement.checklists.length) {
            return <List>
                {requirement.checklists.map((result, i) => {
                    return <List.Item key={i} className={"task-list-" + result.status}>
                        <List.Icon name='circle'/>
                        <List.Content>
                            <List.Description>{result.description}</List.Description>
                        </List.Content>
                    </List.Item>
                })}
            </List>;
        }
        return "";
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, dispatch} = this.props;
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='optionalItems'
                        defaultMessage='Optional Items'
                    />
                    <div className="edit-info-line"/>
                    <div className="edit-info-icon" onClick={this.edit}>
                        <Icon name='pencil'/>
                    </div>
                </Header>
                <ReadOnly icon="tasks" title="Checklists"
                          value={this.formatChecklists()}/>
                <ReadOnly icon="attach" title="Attachments"
                          value={requirement.fileList && requirement.fileList.length > 0 ?
                              <DisplayFile fileList={requirement.fileList}/> : ""}/>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <OptionalItem
                        info={requirement}
                        dispatch={dispatch}
                        ref={node => {
                            optionalModule = node
                        }}
                        showAction={true}
                    />
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.update()}>
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

export default EditOptionalInfo;
