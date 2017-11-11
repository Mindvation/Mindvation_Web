import React, {Component} from 'react';
import {Header, Icon, Modal, Button, Table, Image} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import AdditionalInfo from '../AdditionalInfo';
import {updateStoryAdditional} from '../../../../actions/story_action';
import TagList from '../../create/TagList';
import Display from '../../../common/Display';
import {priorityOptions} from '../../../../res/data/dataOptions';

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
        additionalInfo.storyId = this.props.story.storyId;
        additionalInfo.projectId = this.props.story.projectId;
        this.props.dispatch(updateStoryAdditional(additionalInfo, this.closeModal));
    };

    render() {
        const {modalOpen} = this.state;
        const {story, disabled} = this.props;
        const readyOnlyItems = [{
            icon: "tag",
            title: "Tags",
            value: story.tags && story.tags.length > 0 ? <TagList
                tagList={story.tags} toggle={false}/> : ""
        }, {
            icon: "sitemap",
            title: "Process/Function Label",
            value: <div style={{display: "flex"}} className="components-length">
                <Display
                    value={story.requirementFunctionLabel ? story.requirementFunctionLabel.name : ''}
                />
                <Icon name="linkify" size="big" style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
                <span
                    style={{flex: 1, marginTop: '1em'}}>{story.functionLabel ? story.functionLabel.name : 'N/A'}</span>
            </div>
        }, {
            icon: "flag",
            title: "Priority",
            value: story.priority,
            options: priorityOptions
        }, {
            icon: "group",
            title: "Members",
            value: story.roles && story.roles.length > 0 ?
                <Table basic='very' collapsing>
                    <Table.Body>
                        {story.roles.map((role, i) => {
                            return role.members && role.members.length > 0 ?
                                <Table.Row key={i}>
                                    <Table.Cell>{role.name}</Table.Cell>
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
            value: story.startDate && story.endDate ? story.startDate + " ~ " + story.endDate : ""
        }, {
            icon: "database",
            title: "Story Points",
            value: story.storyPoints
        }];
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='additionalInfo'
                        defaultMessage='additional Info'
                    />
                    {
                        disabled ? null :
                            <div className="edit-line-cont">
                                <div className="edit-info-line"/>
                                <div className="edit-info-icon" onClick={this.edit}>
                                    <Icon name='pencil'/>
                                </div>
                            </div>
                    }
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
                        info={story}
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
