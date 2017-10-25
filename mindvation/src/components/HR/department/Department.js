import React, {Component} from 'react';
import DepartmentList from './DepartmentList';
import {Header, Icon} from 'semantic-ui-react';
import CreateDepartment from './CreateDepartment';

import {FormattedMessage} from 'react-intl';

class Department extends Component {
    render() {
        const {dispatch, department} = this.props;
        return (
            <div className="project-content">
                <Header as='h3'>
                    <Icon name='home'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='departmentTitle'
                            defaultMessage='Department'
                        />
                    </Header.Content>
                </Header>
                <DepartmentList dispatch={dispatch} department={department}/>
                <CreateDepartment dispatch={dispatch}/>
            </div>
        );
    }
}

export default Department;
