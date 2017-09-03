import React, {Component} from 'react';
import {Button, Modal, Segment, Header, Icon, Image, Table} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ChooseMembers from '../../../containers/member_container';
import {getRolesByModel} from '../../../actions/role_action';
import {updateRequirement} from '../../../actions/requirement_action';

let chooseMembersNode;

class SelectMembers extends Component {
    state = {modalOpen: false};

    componentWillMount() {
        this.props.dispatch(getRolesByModel('agile'));
    }

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
        const {requirement, roles} = this.props;
        requirement.roles = roles;
        this.props.dispatch(updateRequirement(requirement));
        this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        const {requirement, roles} = this.props;
        return (
            <div style={{marginBottom: '10px'}} className={"components-length components-item"}>
                <div className="single-line">
                    <Header as='h4'>
                        <Icon name="group"/>
                        <Header.Content>
                            <FormattedMessage
                                id="Members"
                                defaultValue="Members"
                            />
                        </Header.Content>
                    </Header>
                    <Header style={{cursor: 'pointer', marginLeft: '50px', color: 'blue'}}
                            size='small' className="underLine"
                            floated='right'
                            onClick={() => this.openModal()}>
                        Using Agile Team Structure Mode

                    </Header>
                </div>

                {requirement.roles && requirement.roles.length > 0 ?
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
                    </Table> : null}

                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        Agile team + TP Structure
                    </Modal.Header>
                    <Modal.Content>
                        {
                            roles.map((role, i) => {
                                return <Button key={i} basic className="select-member-role-button" onClick={() => {
                                    this.chooseMembersForRole(role)
                                }}>
                                    {role.members && role.members.length > 0 ?
                                        <Icon size='big' name='users' color='black'/> :
                                        <Icon size='big' name='add user' color='black'/>
                                    }
                                    <div className="select-member-role-button-text">
                                        {role.key}
                                    </div>
                                    <div>
                                        ({role.members && role.members.length > 0 ? role.members.length + " Member" +
                                        (role.members.length > 1 ? "s" : "")
                                        : "No Member"})
                                    </div>
                                </Button>
                            })
                        }

                    </Modal.Content>
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
                <ChooseMembers ref={node => chooseMembersNode = node}/>
            </div>
        );
    }
}

export default SelectMembers;
