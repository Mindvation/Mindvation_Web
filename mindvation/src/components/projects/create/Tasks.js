import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteTask} from '../../../actions/task_action';
import EditTask from './EditTask';

const headerWithAction = ["ID Number", "Description", "Assignee", "Assigner", "Create Date", "Latest Update", "Status", ""];
const header = ["ID Number", "Description", "Assignee", "Assigner", "Create Date", "Latest Update", "Status"];
const taskKey = ["idNumber", "description", "assignee", "assigner", "createDate", "lastUpdateDate", "status"];

let editTaskNode;

class Tasks extends Component {

    getTaskDesc = (result, key) => {
        if (key === "assignee" && !isEmpty(result[key])) {
            return getDesc(global.dummyData.assignOptions, result[key])
        }
        if (key === "status" && !isEmpty(result[key])) {
            return getDesc(global.dummyData.statusOptions, result[key])
        }
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    delete = (result) => {
        this.props.dispatch(deleteTask(result))
    };

    edit = (result) => {
        editTaskNode.openModal(result);
    };

    render() {
        const {tasks, showAction, dispatch} = this.props;
        let displayHeader = showAction ? headerWithAction : header;
        return (
            <div>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            {
                                displayHeader.map((result, i) => {
                                    return <Table.HeaderCell className="task-table-cell-length" key={i}>
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
                            tasks.map((result, i) => {
                                return <Table.Row key={i}>
                                    {
                                        taskKey.map((key, j) => {
                                            return <Table.Cell
                                                className={"task-table-cell-length " + (key === "description" ? "text-ellipsis" : "")}
                                                key={i + "_" + j}>
                                                {this.getTaskDesc(result, key)}
                                            </Table.Cell>
                                        })
                                    }
                                    {showAction ? <Table.Cell className="task-action-cell">
                                        <Button primary size="small" onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </Button>
                                        <Button color='red' size="small" onClick={() => this.delete(result)}>
                                            <FormattedMessage
                                                id='delete'
                                                defaultMessage='Delete'
                                            />
                                        </Button>
                                    </Table.Cell> : null}
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
                <EditTask ref={node => editTaskNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default Tasks;
