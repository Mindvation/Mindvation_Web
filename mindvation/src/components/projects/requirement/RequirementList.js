import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty, dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {retrieveRequirements} from '../../../actions/requirements_action';
import {
    Link
} from 'react-router-dom';
import {priorityOptions} from '../../../res/data/dataOptions';

const header = ["Req ID", "Summary", "Priority", "Start Time", "End Time", "Leader", "Members"];
const rmKey = ["serialNo", "summary", "priority", "startDate", "endDate", "leader", "memberCunt"];

class RequirementList extends Component {
    pageChange(page, pageSize) {
        this.props.dispatch(retrieveRequirements(page, pageSize, this.props.project.projectId));
    }

    handleDisplayData(data, key) {
        if (key === "serialNo") {
            return <Link to={`/home/requirement/${data[key]}`}>
                {data[key]}
            </Link>
        }
        if (key === "priority" && !isEmpty(data[key])) {
            return getDesc(priorityOptions, data[key]);
        }
        if (key === "taskQty") {
            if (data.tasks) {
                return data.tasks.length;
            }
            return 0;
        }
        if (key === "leader") {
            return data.creatorInfo ? data.creatorInfo.name || "N/A" : "N/A";
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
        const {requirements} = this.props;
        return (
            <Table textAlign="center" className="requirement-card">
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

                <Table.Body>
                    {requirements.requirementInfos.map((requirement, i) => {
                        return <Table.Row key={i}>
                            {
                                rmKey.map((key, j) => {
                                    return <Table.Cell
                                        className={"requirement-cell-length " + (key === "summary" ? "text-ellipsis" : "")}
                                        key={i + "_" + j}>
                                        {this.handleDisplayData(requirement, key)}
                                    </Table.Cell>
                                })
                            }
                        </Table.Row>
                    })}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={header.length}>
                            <Pagination defaultCurrent={1} total={requirements.totalElements}
                                        onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default RequirementList;
