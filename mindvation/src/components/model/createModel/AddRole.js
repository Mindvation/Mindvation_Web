import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
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
        return (<div className={"model-label-cont components-item item-horizontal align-right"}>
            <div className="field-title">
                <FormattedMessage
                    id='role'
                    defaultMessage='Role'
                />
            </div>
            <div className="model-label-main input-content">
                <Button className="confirm-button" onClick={() => this.addRole()}>
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
                            <Button className="delete-button"
                                    onClick={() => this.removeRole(roleData, role)}>
                                <FormattedMessage
                                    id='delete'
                                    defaultMessage='Delete'
                                />
                            </Button>
                        </div>
                    })
                }
            </div>
        </div>);
    }
}

export default AddRole;
