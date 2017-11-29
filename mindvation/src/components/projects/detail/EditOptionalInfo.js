import React, {Component} from 'react';
import {Modal, Button, List} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import OptionalItem from '../create/OptionalItem';
import {updateProjectOptional} from '../../../actions/project_action';
import {clearTempChecklist} from '../../../actions/checklist_action';
import DisplayFile from '../../common/DisplayFile';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

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
        let optionalInfo = this.optionalModule.getInfo();
        let flag = checkValid(optionalInfo);
        if (flag) {
            optionalInfo = getDataInfo(optionalInfo);
            optionalInfo.projectId = this.props.project.projectId;
            this.props.dispatch(updateProjectOptional(optionalInfo, function () {
                this.props.dispatch(clearTempChecklist());
                this.closeModal();
            }.bind(this)));
        }
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
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editOptionalItems'
                        defaultMessage='Edit Optional Items'
                    />
                </div>}
                <div className="edit-detail-info">
                    <ReadOnly icon="tasks" title="Checklists"
                              value={this.formatChecklists()}/>
                    <ReadOnly icon="attach" title="Attachments"
                              value={project.fileList && project.fileList.length > 0 ?
                                  <DisplayFile fileList={project.fileList}/> : ""}/>
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <OptionalItem
                        info={project}
                        dispatch={dispatch}
                        ref={node => {
                            this.optionalModule = node
                        }}
                        showAction={true}
                        isEdit={true}
                    />
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.update()}>
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
