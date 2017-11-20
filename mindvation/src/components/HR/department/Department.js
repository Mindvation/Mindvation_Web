import React, {Component} from 'react';
import DepartmentList from './DepartmentList';
import CreateDepartment from './CreateDepartment';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class Department extends Component {
    render() {
        const {dispatch, department} = this.props;
        return (
            <div>
                <div className="project-header">
                    <Image name='department'/>
                    <FormattedMessage
                        id='departmentTitle'
                        defaultMessage='Department'
                    />
                </div>
                <CreateDepartment dispatch={dispatch}/>
                <DepartmentList dispatch={dispatch} department={department}/>
            </div>
        );
    }
}

export default Department;
