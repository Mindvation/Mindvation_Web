import React, {Component} from 'react';
import {Table, Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';

class ChooseMembers extends Component {

    state = {
        chooseRoleMembers: Object.assign([], (this.props.info.roles))
    };

    toggleChooseMember(role, member) {
        let tempRoleMembers = this.state.chooseRoleMembers;
        if (this.isExistRole(tempRoleMembers, role)) {
            tempRoleMembers.some((tempMember) => {
                if (tempMember.key === role.key) {
                    if (this.isChooseMember(tempMember.members, member)) {
                        tempMember.members.splice(tempMember.members.indexOf(member), 1);
                    } else {
                        tempMember.members.push(member);
                    }
                    return true;
                }
            })
        } else {
            tempRoleMembers.push({
                "key": role.key,
                "members": [member]
            })
        }

        this.setState({
            chooseRoleMembers: tempRoleMembers
        })
    }

    isExistRole(roles, role) {
        let flag = false;
        roles.some((item) => {
            if (item.key === role.key) {
                flag = true;
                return true;
            }
        });
        return flag;
    }

    checkMemberStatus(roleMembers, role, member) {
        let flag = false;
        roleMembers.some((roleMember) => {
            if (roleMember.key === role.key) {
                flag = this.isChooseMember(roleMember.members, member);
                return true;
            }
        });
        return flag;
    }

    isChooseMember(members, member) {
        let flag = false;
        members.some((item) => {
            if (item.name.value === member.name.value) {
                flag = true;
                return true;
            }
        });
        return flag;
    }

    getValue() {
        return this.state.chooseRoleMembers
    }

    render() {
        const {requirement = {}, info = {}} = this.props;
        return (
            <div className="components-item item-horizontal align-right">
                <div className='field-title'>
                    <FormattedMessage
                        id='Members'
                        defaultMessage='Members'
                    />
                </div>
                <Table basic='very' collapsing className="input-content choose-member-table">
                    <Table.Body>
                        {(requirement.roles || info.requirementRoles || []).map((role, i) => {
                            return role.members && role.members.length > 0 ?
                                <Table.Row key={i}>
                                    <Table.Cell>{role.name}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            role.members.map((member, j) => {
                                                return <div className="table-single-line" key={i + "_" + j}>
                                                    <div
                                                        className={(this.checkMemberStatus(this.state.chooseRoleMembers, role, member) ? "member-selected " : "")
                                                        + "choose-member-style"}
                                                        onClick={() => this.toggleChooseMember(role, member)}>
                                                        <Image verticalAlign="middle" src={member.name.image.src}
                                                               avatar/>
                                                        {member.name.text}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </Table.Cell>
                                </Table.Row> :
                                null
                        })}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default ChooseMembers;
