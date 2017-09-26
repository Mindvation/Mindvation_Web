import React, {Component} from 'react';
import {Input, Header, Button, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';

let roleKey = 0;

class AddRole extends Component {
    state = {
        roleData: []
    };

    getInfo = () => {
        return this.state.roleData
    };

    addRole = () => {
        let tempData = this.state.roleData;
        tempData.push({key: "R" + roleKey++, value: ""});
        this.setState({
            roleData: tempData
        })
    };

    removeRole = (roleData, role) => {
        roleData.splice(roleData.indexOf(role), 1);
        this.setState({
            roleData: roleData
        })
    };

    render() {
        const {roleData} = this.state;
        return (<div className={"model-label-cont item-horizontal components-item"}>
            <Header as='h4'>
                <Header.Content>
                    <FormattedMessage
                        id='role'
                        defaultMessage='Role'
                    />
                </Header.Content>
            </Header>
            <div className="model-label-main">
                <Button className="model-add-label" onClick={() => this.addRole()}>
                    <FormattedMessage
                        id='addRole'
                        defaultMessage='Add Role'
                    />
                </Button>
                {
                    roleData.map((role, i) => {
                        return <div key={i} className="role-label model-label">
                            <Input
                                autoFocus={true}
                                value={role.value}
                                onChange={(event, data) => {
                                    role.value = data.value;
                                    this.setState({
                                        roleData: roleData
                                    })
                                }}/>
                            <Icon name="trash" size="big" className={"mode-remove-label pointer-cursor"}
                                  onClick={() => this.removeRole(roleData, role)}/>
                        </div>
                    })
                }
            </div>
        </div>);
    }
}

export default AddRole;
