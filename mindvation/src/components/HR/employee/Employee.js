import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import {Header, Icon} from 'semantic-ui-react';
import CreateEmployee from './CreateEmployee';
import {getAllDepartment} from '../../../util/Service';

import {FormattedMessage} from 'react-intl';

class Employee extends Component {
    state = {department: []};

    componentWillMount() {
        getAllDepartment((department) => {
            this.setState({
                department: department
            })
        })
    }

    render() {
        const {dispatch, employee} = this.props;
        const {department} = this.state;
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
                <EmployeeList dispatch={dispatch} employee={employee} department={department}/>
                <CreateEmployee dispatch={dispatch} department={department}/>
            </div>
        );
    }
}

export default Employee;
