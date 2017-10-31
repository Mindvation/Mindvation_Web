import React, {Component} from 'react';
import {Header, Icon, Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import BasicInfo from '../BasicInfo';
import {checkCompleted} from '../../../../util/CommUtil';
import {updateRequirementBasic} from '../../../../actions/requirement_action';

let basicModule;
let mandatoryFile = ["summary", "description"];

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
            basicInfo.projectId = this.props.requirement.projectId;
            basicInfo.reqId = this.props.requirement.reqId;
            this.props.dispatch(updateRequirementBasic(basicInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, disabled} = this.props;
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='basicInfo'
                        defaultMessage='Basic info'
                    />
                    {disabled ? null : <div className="edit-line-cont">
                        <div className="edit-info-line"/>
                        <div className="edit-info-icon" onClick={this.edit}>
                            <Icon name='pencil'/>
                        </div>
                    </div>}
                </Header>
                <ReadOnly icon="product hunt" title="Summary" value={requirement.summary}/>
                <ReadOnly icon="book" title="Description"
                          value={requirement.description}/>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <BasicInfo
                        info={requirement}
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
