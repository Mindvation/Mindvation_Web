import React, {Component} from 'react';
import {Header, Icon, Modal, Button, Image} from 'semantic-ui-react';
import ReadOnly from '../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import AdditionalInfo from '../create/AdditionalInfo';
import {updateProjectAdditional} from '../../../actions/project_action';
import TagList from '../create/TagList';

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
        const {project} = this.props;
        const readyOnlyItems = [{
            icon: "tag",
            title: "Tags",
            value: project.tags && project.tags.length > 0 ? <TagList
                tagList={project.tags} toggle={false}/> : ""
        }, {
            icon: "flag",
            title: "Priority",
            value: project.priority,
            options: global.dummyData.priorityOptions
        }, {
            icon: "user",
            title: "Leaders",
            value: project.leaders && project.leaders.length > 0 ? project.leaders.map((member, i) => {
                return <div className="read-only-text-item" key={i}>
                    <Image verticalAlign="middle" src={member.avatar}
                           avatar/>
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
            options: global.dummyData.contingencyOptions
        }];
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='additionalInfo'
                        defaultMessage='additional Info'
                    />
                    <div className="edit-info-line"/>
                    <div className="edit-info-icon" onClick={this.edit}>
                        <Icon name='pencil'/>
                    </div>
                </Header>
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

export default EditAdditionalInfo;
