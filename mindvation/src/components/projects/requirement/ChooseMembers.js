import React, {Component} from 'react';
import {Button, Modal, Input} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import TagList from './TagListForMember';
import Members from './Members';
import {searchMembersByTags, clearTempMembers} from '../../../actions/member_action';
import {updateRoleMembers} from '../../../actions/role_action';

const allTags = [{
    key: "T1",
    text: "React Native",
    color: "#7efefe"
}, {
    key: "T2",
    text: "PHP",
    color: "#ff9900"
}, {
    key: "T3",
    text: "Business Canvas",
    color: "#66cc33"
}, {
    key: "T4",
    text: "EPICs",
    color: "#0099cc"
}, {
    key: "T5",
    text: "BI",
    color: "#ffcc00"
}, {
    key: "T6",
    text: "Reactjs",
    color: "#7efefe"
}];

let searchNode, tagsNode, membersNode;

class ChooseMembers extends Component {
    state = {modalOpen: false, role: ''};

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

    openModal = (role) => this.setState({modalOpen: true, role: role});

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempMembers());
    };

    searchMembers = () => {
        let tagOrder = tagsNode.getTagOrder();
        this.props.dispatch(searchMembersByTags(tagOrder));
    };

    addMemberToRole = () => {
        let membersForRole = membersNode.getSelectedMembers();
        let tempRole = Object.assign({}, this.state.role);
        tempRole.members = membersForRole;
        this.props.dispatch(updateRoleMembers(tempRole));
        this.closeModal();
    };

    render() {
        const {modalOpen} = this.state;
        const {members} = this.props;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    className="choose-members-modal">
                    <Modal.Header>
                        <FormattedMessage
                            id="chooseMembers"
                            defaultValue="Choose Members"
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <TagList
                            tagList={allTags}
                            ref={node => tagsNode = node}
                        />
                        <Input
                            className="choose-members-search"
                            fluid
                            icon={{
                                name: 'search', circular: true, link: true,
                                onClick: () => this.searchMembers()
                            }}
                            ref={node => searchNode = node}
                            defaultValue={this.state.role.key}
                        />
                        <Members
                            ref={node => membersNode = node}
                            members={members}/>
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
