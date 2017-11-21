import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';
import {getAllDepartment} from '../../../util/Service';
import Image from '../../common/Image';
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
            <div>
                <div className="project-header">
                    <Image name='employee'/>
                    <FormattedMessage
                        id='employeeTitle'
                        defaultMessage='Employee'
                    />
                </div>
                <CreateEmployee dispatch={dispatch} department={department}/>
                <EmployeeList dispatch={dispatch} employee={employee} department={department}/>
            </div>
        );
    }
}

export default Employee;
