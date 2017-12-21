import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteDepartment, getDepartmentList} from '../../../actions/department_action';
import EditDepartment from './EditDepartment';

const header = ["Department ID", "Department Name", "Position", "Action"];
const checklistKey = ["id", "name", "positions"];

class DepartmentList extends Component {
    componentDidMount() {
        this.props.dispatch(getDepartmentList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getDepartmentList(page, pageSize));
    }

    getChecklistDesc = (result, key) => {
        if (key === "positions" && result[key] && result[key].length > 0) {
            let tempStr = "";
            result[key].map((item) => {
                tempStr += item.name + "/ ";
            });
            return tempStr.substr(0, tempStr.length - 2);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    remove = (result) => {
        this.props.dispatch(deleteDepartment(result))
    };

    edit = (result) => {
        this.editDepartmentNode.openModal(result)
    };

    render() {
        const {department, dispatch} = this.props;
        return (
            <div>
                <Table textAlign="center">
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
                            department.departments.map((result, i) => {
                                return <Table.Row key={i}>
                                    {
                                        checklistKey.map((key, j) => {
                                            return <Table.Cell
                                                key={i + "_" + j}>
                                                {this.getChecklistDesc(result, key)}
                                            </Table.Cell>
                                        })
                                    }
                                    <Table.Cell className="checklist-action-cell">
                                        <div className="table-action-edit" onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </div>
                                        <div className="table-action-delete" onClick={() => this.remove(result)}>
                                            <FormattedMessage
                                                id='delete'
                                                defaultMessage='Delete'
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={header.length}>
                                <Pagination defaultCurrent={1} total={department.totalElements}
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditDepartment dispatch={dispatch} ref={node => this.editDepartmentNode = node}/>
            </div>
        );
    }
}

export default DepartmentList;
