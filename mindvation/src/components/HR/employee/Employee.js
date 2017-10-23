import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import {Header, Icon} from 'semantic-ui-react';
import CreateEmployee from './CreateEmployee';

import {FormattedMessage} from 'react-intl';

class Employee extends Component {
    render() {
        const {dispatch, employee} = this.props;
        return (
            <div className="project-content">
                <Header as='h3'>
                    <Icon name='users'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='employeeTitle'
                            defaultMessage='Employee'
                        />
                    </Header.Content>
                </Header>
                <EmployeeList dispatch={dispatch} employee={employee}/>
                <CreateEmployee dispatch={dispatch}/>
            </div>
        );
    }
}

export default Employee;
