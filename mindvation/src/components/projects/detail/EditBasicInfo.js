import React, {Component} from 'react';
import {Header, Icon, Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../create/BasicInfo';
import {checkCompleted} from '../../../util/CommUtil';
import {updateProjectBasic} from '../../../actions/project_action';

let basicModule;
let mandatoryFile = ["projectName", "description"];

class EditBasicInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let basicInfo = basicModule.getInfo();
        let flag = checkCompleted(mandatoryFile, basicInfo);
        if (flag) {
            basicInfo.projectId = this.props.project.projectId;
            this.props.dispatch(updateProjectBasic(basicInfo, () => this.closeModal()));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {project} = this.props;
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='basicInfo'
                        defaultMessage='Basic info'
                    />
                    <div className="edit-info-line"/>
                    <div className="edit-info-icon" onClick={this.edit}>
                        <Icon name='pencil'/>
                    </div>
                </Header>
                <ReadOnly icon="product hunt" title="Project Name" value={project.projectName}/>
                <ReadOnly icon="book" title="Description"
                          value={project.description}/>

                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <BasicInfo
                        info={project}
                        ref={node => {
                            basicModule = node
                        }}
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

export default EditBasicInfo;
