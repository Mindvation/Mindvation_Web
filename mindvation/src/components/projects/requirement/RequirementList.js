import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty, dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import Discussion from './Discussion';
import {retrieveRequirements} from '../../../actions/requirements_action';
import {
    Link
} from 'react-router-dom';

const header = ["Req ID", "Summary", "Priority", "Start Time", "End Time", "Leader", "Members"];
const rmKey = ["reqmntId", "summary", "priority", "startDate", "endDate", "leader", "members"];

class RequirementList extends Component {
    pageChange(page, pageSize) {
        this.props.dispatch(retrieveRequirements(page, pageSize, this.props.project.projectId));
    }

    handleDisplayData(data, key) {
        if (key === "reqmntId") {
            return <Link to={`/home/requirement/${data[key]}`}>
                {data[key]}
            </Link>
        }
        if (key === "priority" && !isEmpty(data[key])) {
            return getDesc(global.dummyData.priorityOptions, data[key]);
        }
        if (key === "taskQty") {
            if (data.tasks) {
                return data.tasks.length;
            }
            return 0;
        }
        if (key === "members") {
            let members = [];
            if (data.roles) {
                data.roles.map((role) => {
                    if (role.members && role.members.length > 0) {
                        role.members.map((member) => {
                            if (this.checkRepeat(members, member)) {
                                members.push(member);
                            }
                        })
                    }
                })
            }
            return members.length;
        }
        if ((key === "startDate" || key === "endDate") && !isEmpty(data[key])) {
            return dateFormat(new Date(data[key]), "yyyy-MM-dd");
        }
        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    }

    checkRepeat(members, member) {
        let flag = true;
        if (members.length !== 0) {
            members.some((item) => {
                if (item.name.value === member.name.value) {
                    flag = false;
                    return true;
                }
            })
        }

        return flag;
    }

    render() {
        const {requirements, dispatch} = this.props;
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return <Table.HeaderCell className="requirement-cell-length" key={i}>
                                    <FormattedMessage
                                        id={result}
                                    />
                                </Table.HeaderCell>
                            })
                        }
                    </Table.Row>
                </Table.Header>
                {
                    requirements.requirementInfos.map((result, i) => {
                        return <Table.Body key={i}>
                            <Table.Row>
                                {
                                    rmKey.map((key, j) => {
                                        return <Table.Cell
                                            className={"requirement-cell-length " + (key === "summary" ? "text-ellipsis" : "")}
                                            key={i + "_" + j}>
                                            {this.handleDisplayData(result, key)}
                                        </Table.Cell>
                                    })
                                }
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan={rmKey.length}>
                                    <Discussion requirement={result} dispatch={dispatch}/>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    })
                }


                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={header.length}>
                            <Pagination defaultCurrent={1} total={requirements.totalElements}
                                        showQuickJumper
                                        onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default RequirementList;
