import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

const header = ["ID Number", "Description", "Assignee", "Assigner", "Create Date", "Latest Update", "Status"];
const checklistKey = ["idNumber", "description", "Assignee", "assigner", "createDate", "lastUpdateDate", "status"];

class Checklist extends Component {

    getTaskDesc = (result, key) => {
        if (key === "Assignee" && !isEmpty(result[key])) {
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

    render() {
        const {checklist} = this.props;
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return <Table.HeaderCell className="task-table-cell-length" key={i}>
                                    <FormattedMessage
                                        id={result}
                                    />
                                </Table.HeaderCell>
                            })
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        checklist.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    checklistKey.map((key, j) => {
                                        return <Table.Cell
                                            className={"table-cell-length " + (key === "description" ? "text-ellipsis" : "")}
                                            key={i + "_" + j}>
                                            {this.getTaskDesc(result, key)}
                                        </Table.Cell>
                                    })
                                }
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table>
        );
    }
}

export default Checklist;
