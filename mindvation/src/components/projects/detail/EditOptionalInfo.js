import React, {Component} from 'react';
import {Header, Icon, Modal, Button, List} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import OptionalItem from '../create/OptionalItem';
import {updateProjectOptional} from '../../../actions/project_action';
import {clearTempChecklist} from '../../../actions/checklist_action';
import DisplayFile from '../../common/DisplayFile';

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
        /*this.props.dispatch(updateProject(optionalInfo));
        this.props.dispatch(clearTempChecklist());
        this.closeModal();*/
        optionalInfo.projectId = this.props.project.projectId;
        this.props.dispatch(updateProjectOptional(optionalInfo, function () {
            this.props.dispatch(clearTempChecklist());
            this.closeModal();
        }.bind(this)));
    };

    formatChecklists = () => {
        const {project} = this.props;
        if (project.checklists && project.checklists.length) {
            return <List>
                {project.checklists.map((result, i) => {
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
        const {project, dispatch, disabled} = this.props;
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='optionalItems'
                        defaultMessage='Optional Items'
                    />
                    {disabled ? null : <div className="edit-line-cont">
                        <div className="edit-info-line"/>
                        <div className="edit-info-icon" onClick={this.edit}>
                            <Icon name='pencil'/>
                        </div>
                    </div>}
                </Header>
                <ReadOnly icon="tasks" title="Checklists"
                          value={this.formatChecklists()}/>
                <ReadOnly icon="attach" title="Attachments"
                          value={project.fileList && project.fileList.length > 0 ?
                              <DisplayFile fileList={project.fileList}/> : ""}/>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <OptionalItem
                        info={project}
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
