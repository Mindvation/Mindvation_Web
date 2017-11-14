import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import AdditionalInfo from '../create/AdditionalInfo';
import {updateProjectAdditional} from '../../../actions/project_action';
import TagList from '../create/TagList';
import {priorityOptions, contingencyOptions} from '../../../res/data/dataOptions';

let AdditionalModule;

class EditAdditionalInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    edit = () => {
        this.openModal();
    };

    update = () => {
        let additionalInfo = AdditionalModule.getInfo();
        additionalInfo.projectId = this.props.project.projectId;
        this.props.dispatch(updateProjectAdditional(additionalInfo, () => this.closeModal()));
    };

    render() {
        const {modalOpen} = this.state;
        const {project, disabled} = this.props;
        const readyOnlyItems = [{
            icon: "tag",
            title: "Tags",
            value: project.tags && project.tags.length > 0 ? <TagList
                tagList={project.tags} toggle={false}/> : ""
        }, {
            icon: "flag",
            title: "Priority",
            value: project.priority,
            options: priorityOptions
        }, {
            icon: "user",
            title: "Leaders",
            value: project.leaders && project.leaders.length > 0 ? project.leaders.map((member, i) => {
                return <div className="read-only-text-member" key={i}>
                    {/*<Image verticalAlign="middle" src={member.avatar}
                           avatar/>*/}
                    <span>{member.name}</span>
                </div>
            }) : ""
        }, {
            icon: "clock",
            title: "Start / End Date",
            value: project.startDate && project.endDate ? project.startDate + " ~ " + project.endDate : ""
        }, {
            icon: "file",
            title: "projectModels",
            hasSubItem: true
        }, {
            title: "Software Model",
            value: project.softwareModel ? project.softwareModel.text : '',
            isSubItem: true
        }, {
            title: "Engineering Model",
            value: project.engineeringModel ? project.engineeringModel.text : '',
            isSubItem: true
        }, {
            title: "Business Requirement Model",
            value: project.businessModel ? project.businessModel.text : '',
            isSubItem: true
        }, {
            title: "Technique Model",
            value: project.techniqueModel ? project.techniqueModel.text : '',
            isSubItem: true
        }, {
            icon: "percent",
            title: "Contingency",
            value: project.contingency,
            options: contingencyOptions
        }];
        return (
            <div className="read-only-component">
                {/*<Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='additionalInfo'
                        defaultMessage='additional Info'
                    />
                    {disabled ? null : <div className="edit-line-cont">
                        <div className="edit-info-line"/>
                        <div className="edit-info-icon" onClick={this.edit}>
                            <Icon name='pencil'/>
                        </div>
                    </div>}
                </Header>*/}
                {disabled ? null : <div className="edit-detail-button" onClick={this.edit}>
                    <FormattedMessage
                        id='editAdditionalInfo'
                        defaultMessage='Edit Additional Info'
                    />
                </div>}
                <div className="edit-detail-info">
                    {readyOnlyItems.map((item, i) => {
                        return <ReadOnly
                            key={i}
                            icon={item.icon}
                            title={item.title}
                            value={item.value}
                            hasSubItem={item.hasSubItem}
                            isSubItem={item.isSubItem}
                            options={item.options}
                        />
                    })}
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <AdditionalInfo
                        info={project}
                        ref={node => {
                            AdditionalModule = node
                        }}
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

export default EditAdditionalInfo;
