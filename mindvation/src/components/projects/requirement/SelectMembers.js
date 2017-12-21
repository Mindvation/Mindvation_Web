import React, {Component} from 'react';
import {Button, Modal, Popup, Image, Table} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ChooseMembers from '../../../containers/member_container';
import MVImage from '../../common/Image';

let chooseMembersNode;

class SelectMembers extends Component {
    state = {modalOpen: false};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    chooseMembersForRole = (role) => {
        chooseMembersNode.getWrappedInstance().openModal(role);
    };

    update = () => {
        /*const {requirement, roles} = this.props;
        requirement.roles = roles;
        this.props.dispatch(updateRequirement(requirement));*/
        this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        const {roles, model, tags} = this.props;
        return (
            <div style={{marginBottom: '10px'}} className="components-item item-horizontal align-right">

                <div className="field-title">
                    <FormattedMessage
                        id="Members"
                        defaultValue="Members"
                    />
                </div>
                <div className="input-content">
                    <div className="display-flex" style={{paddingTop: '8px'}}>
                        <div className="underLine model-title"
                             onClick={() => this.openModal()}>
                            <FormattedMessage
                                id="usingModel"
                                defaultValue="Using {modelType} Team Structure Mode"
                                values={{modelType: model}}
                            />
                        </div>
                        <Popup
                            trigger={<div><MVImage name="alert"/></div>}
                            content={<FormattedMessage
                                id="modelDesc"
                                defaultValue='This Project had select to be Software Dev model with {modelType} template'
                                values={{modelType: model}}
                            />}
                            position='right center'
                            inverted
                            className="mode-desc-popup"
                        />
                    </div>

                    {roles && roles.length > 0 ?
                        <Table basic='very' collapsing>
                            <Table.Body>
                                {roles.map((role, i) => {
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
                        </Table> : null}
                </div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <MVImage name="use_model"/>
                        <FormattedMessage
                            id="usingModel"
                            defaultValue="Using {modelType} Team Structure Mode"
                            values={{modelType: model}}
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <div className="members-container">
                            {
                                roles.map((role, i) => {
                                    return <Button key={i} basic className="select-member-role-button" onClick={() => {
                                        this.chooseMembersForRole(role)
                                    }}>
                                        {role.members && role.members.length > 0 ?
                                            <MVImage name="members" style={{marginRight: 0}}/> :
                                            <MVImage name="add_member" style={{marginRight: 0}}/>
                                        }
                                        <div className="select-member-role-button-text">
                                            {role.name}
                                        </div>
                                        <div>
                                            {role.members && role.members.length > 0 ?
                                                role.members.length : <FormattedMessage
                                                    id="noMember"
                                                    defaultValue="No Member"
                                                />}
                                            {role.members && role.members.length > 0 ?
                                                <FormattedMessage
                                                    id="quantifierOfMember"
                                                    defaultValue=' Member'
                                                /> : null}
                                            {role.members && role.members.length > 1 ? <FormattedMessage
                                                id="pluralForEnglish"
                                                defaultValue=' s'
                                            /> : null}
                                        </div>
                                    </Button>
                                })
                            }
                        </div>
                    </Modal.Content>
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
                <ChooseMembers tags={tags} ref={node => chooseMembersNode = node}/>
            </div>
        );
    }
}

export default SelectMembers;
