import React, {Component} from 'react';
import {Button, Modal, Input} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import TagList from './TagListForMember';
import Members from './Members';
import {searchMembersByTags, clearTempMembers} from '../../../actions/member_action';
import {updateRoleMembers} from '../../../actions/role_action';

let searchNode, tagsNode, membersNode;

class ChooseMembers extends Component {
    state = {modalOpen: false, role: {}, originMembers: []};

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

    openModal = (role) => {
        this.setState({modalOpen: true, role: role, originMembers: Object.assign([], role.members)})
    };

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempMembers());
    };

    searchMembers = () => {
        let tagOrder = tagsNode.getTagOrder();
        let memberName = searchNode.inputRef.value;
        this.props.dispatch(searchMembersByTags(tagOrder, memberName));
    };

    addMemberToRole = () => {
        let membersForRole = membersNode.getSelectedMembers();
        let tempRole = Object.assign({}, this.state.role);
        tempRole.members = membersForRole;
        this.props.dispatch(updateRoleMembers(tempRole));
        this.closeModal();
    };

    render() {
        const {modalOpen, originMembers, role} = this.state;
        const {members, tags} = this.props;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id="chooseMembers"
                            defaultValue="Choose {roleName} Members"
                            values={{roleName: role ? role.name : ''}}
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TagList
                            tagList={tags}
                            ref={node => tagsNode = node}
                        />
                        <Input
                            className="choose-members-search"
                            fluid
                            action={{
                                className: "add-tag-button",
                                content: <FormattedMessage
                                    id='search'
                                    defaultMessage='Search'
                                />,
                                onClick: () => this.searchMembers()
                            }}
                            labelPosition='right'
                            ref={node => searchNode = node}
                        />
                        <Members
                            ref={node => membersNode = node}
                            members={members}
                            originMembers={originMembers}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.addMemberToRole()}>
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

export default ChooseMembers;
