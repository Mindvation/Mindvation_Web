import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteChecklist} from '../../../actions/checklist_action';
import EditChecklist from './EditChecklist';
import {statusOptions} from '../../../res/data/dataOptions';

const headerWithAction = ["ID Number", "Description", "Assignee", "Assigner", "Create Date", "Latest Update", "Status", ""];
const header = ["ID Number", "Description", "Assignee", "Assigner", "Create Date", "Latest Update", "Status"];
const checklistKey = ["idNumber", "description", "assignee", "assigner", "createDate", "lastUpdateDate", "status"];

let editChecklistNode;

class Checklist extends Component {
    getChecklistDesc = (result, key) => {
        if (key === "assignee" && !isEmpty(result[key])) {
            return result[key].text || 'N/A';
        }
        if (key === "assigner" && !isEmpty(result[key])) {
            return result[key].text;
        }
        if (key === "status" && !isEmpty(result[key])) {
            return getDesc(statusOptions, result[key])
        }
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    remove = (result) => {
        this.props.dispatch(deleteChecklist(result))
    };

    edit = (result) => {
        editChecklistNode.openModal(result);
    };

    render() {
        const {checklists, showAction, dispatch, assignOption} = this.props;
        let displayHeader = showAction ? headerWithAction : header;
        return (
            <div>
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            {
                                displayHeader.map((result, i) => {
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
                            checklists.map((result, i) => {
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
                                    {showAction ? <Table.Cell className="checklist-action-cell">
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
                                    </Table.Cell> : null}
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
                <EditChecklist ref={node => editChecklistNode = node} dispatch={dispatch}
                               assignOption={assignOption}
                />
            </div>
        );
    }
}

export default Checklist;
