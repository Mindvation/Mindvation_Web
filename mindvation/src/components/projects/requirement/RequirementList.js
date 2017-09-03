import React, {Component} from 'react';
import {Table, Popup} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {
    Link
} from 'react-router-dom';

const header = ["Req ID", "Summary", "Priority", "Start Time", "End Time", "Leader", "Members"];
const rmKey = ["reqId", "summary", "priority", "startDate", "endDate", "leader", "members"];

class RequirementList extends Component {
    componentDidMount() {
        //this.props.dispatch(retrieveProjects(1, 10));
    };

    pageChange(page, pageSize) {
        //this.props.dispatch(retrieveProjects(page, pageSize));
    }

    handleDisplayData(data, key) {
        /*if (key === "projectId") {
            return <Link to={`projects/${data[key]}`}>
                {data[key]}
            </Link>
        }*/
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
            let memberNumber = 0;
            data.roles.map((role) => {
                if (role.members) {
                    memberNumber += role.members.length;
                }
            })
            return memberNumber;
        }
        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    }

    render() {
        const {requirements} = this.props;
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

                <Table.Body>
                    {
                        requirements.map((result, i) => {
                            return <Table.Row key={i}>
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
                        })
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={header.length}>
                            <Pagination defaultCurrent={1} total={96}
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
