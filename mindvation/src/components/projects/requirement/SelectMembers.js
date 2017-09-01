import React, {Component} from 'react';
import {Button, Modal, Segment, Header, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ChooseMembers from './ChooseMembers';

const roles = ["Scrum Master", "Front-End Dev", "Backend Dev", "Backend Dev", "UX Designer", "Business", "Analyst", "BDD", "Architect"];
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
        chooseMembersNode.openModal(role);
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div style={{marginBottom: '10px'}} className={"components-length components-item"}>
                <Segment>
                    <Header style={{cursor: 'pointer'}} size='small' className="underLine" floated='right'
                            onClick={() => this.openModal()}>
                        Using Agile Team Structure Mode
                    </Header>
                </Segment>

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
                                return <Button key={i} basic className="select-member-role-button" onClick={(role) => {
                                    this.chooseMembersForRole(role)
                                }}>
                                    <Icon.Group size='big'>
                                        <Icon size='large' name='user' color='black'/>
                                        <Icon corner name='add' color='black'/>
                                    </Icon.Group>
                                    <div className="select-member-role-button-text">
                                        {role}
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
                        <Button primary onClick={() => this.addTagsToProject()}>
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
