import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteEmployee, getEmployeeList} from '../../../actions/employee_action';
import {genderOptions} from '../../../res/data/dataOptions';
import EditEmployee from './EditDepartment';

const header = ["Employee ID", "Employee Name", "Gender", "Position", "Department", "Mail", "Phone", "Skill Tags", "Status", "Action"];
const checklistKey = ["id", "name", "gender", "position", "department", "mail", "phone", "skillTags", "status"];

class DepartmentList extends Component {
    componentDidMount() {
        this.props.dispatch(getEmployeeList());
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getEmployeeList(page, pageSize));
    }

    getChecklistDesc = (result, key) => {
        if (key === "gender" && !isEmpty(result[key])) {
            return getDesc(genderOptions, result[key]);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    remove = (result) => {
        this.props.dispatch(deleteEmployee(result))
    };

    edit = (result) => {
        this.editEmployeeNode.openModal(result)
    };

    render() {
        const {employee, dispatch} = this.props;
        return (
            <div>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            {
                                header.map((result, i) => {
                                    return <Table.HeaderCell className="checklist-table-cell-length" key={i}>
                                        {result ? <FormattedMessage
                                            id={result}
                                        /> : ""}
                                    </Table.HeaderCell>
                                })
                            }
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            employee.employees.map((result, i) => {
                                return <Table.Row key={i}>
                                    {
                                        checklistKey.map((key, j) => {
                                            return <Table.Cell
                                                className={"checklist-table-cell-length " + (key === "description" ? "text-ellipsis" : "")}
                                                key={i + "_" + j}>
                                                {this.getChecklistDesc(result, key)}
                                            </Table.Cell>
                                        })
                                    }
                                    <Table.Cell className="checklist-action-cell">
                                        <Button primary size="small" onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </Button>
                                        <Button color='red' size="small" onClick={() => this.remove(result)}>
                                            <FormattedMessage
                                                id='delete'
                                                defaultMessage='Delete'
                                            />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={header.length}>
                                <Pagination defaultCurrent={1} total={employee.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditEmployee dispatch={dispatch} ref={node => this.editEmployeeNode = node}/>
            </div>
        );
    }
}

export default DepartmentList;
