import React, {Component} from 'react';
import {Header, Icon, Modal, Button, Table, Image} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import AdditionalInfo from '../AdditionalInfo';
import {updateRequirement} from '../../../../actions/requirement_action';
import TagList from '../../create/TagList';

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
        this.props.dispatch(updateRequirement(additionalInfo));
        this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement} = this.props;
        const readyOnlyItems = [{
            icon: "tag",
            title: "Tags",
            value: requirement.tags && requirement.tags.length > 0 ? <TagList
                tagList={requirement.tags} toggle={false}/> : ""
        }, {
            icon: "flag",
            title: "Priority",
            value: requirement.priority,
            options: global.dummyData.priorityOptions
        }, {
            icon: "group",
            title: "Members",
            value: requirement.roles && requirement.roles.length > 0 ?
                <Table basic='very' collapsing>
                    <Table.Body>
                        {requirement.roles.map((role, i) => {
                            return role.members && role.members.length > 0 ?
                                <Table.Row key={i}>
                                    <Table.Cell>{role.key}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            role.members.map((member, j) => {
                                                return <div className="table-single-line" key={i + "_" + j}>
                                                    <Image verticalAlign="middle" src={member.name.image.src}
                                                           avatar/>
                                                    <span>{member.name.text}</span>
                                                </div>
                                            })
                                        }

                                    </Table.Cell>
                                </Table.Row> :
                                null
                        })}
                    </Table.Body>
                </Table> : ""
        }, {
            icon: "clock",
            title: "Start / End Date",
            value: requirement.startDate && requirement.endDate ? requirement.startDate + " ~ " + requirement.endDate : ""
        }, {
            icon: "database",
            title: "Story Points",
            value: requirement.storyPoints
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
                        info={requirement}
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
