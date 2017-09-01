import React, {Component} from 'react';
import {Table, Popup} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {
    Link
} from 'react-router-dom';

const header = ["Req ID", "Summary", "Priority", "Start Time", "End Time", "Leader", "Members"];
const rmKey = ["reqId", "summary", "priority", "startTime", "endTime", "leader", "members"];
const requirements = [{
    "reqId": "R0",
    "summary": "We need make a B2B project which can help company to solve teamwork.......",
    "priority": "H",
    "startTime": "2017/07/07",
    "endTime": "2017/09/01",
    "leader": "43845076",
    "members": 7
}];

class RequirementList extends Component {
    componentDidMount() {
        //this.props.dispatch(retrieveProjects(1, 10));
    };

    pageChange(page, pageSize) {
        //this.props.dispatch(retrieveProjects(page, pageSize));
    }

    handleDisplayData(data, key) {
        if (key === "projectId") {
            return <Link to={`projects/${data[key]}`}>
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
        if (key === "description") {
            return <Popup
                trigger={<span>{data[key]}</span>}
                content={data[key]}
                basic
                position="bottom left"
                style={{maxWidth: '50%'}}
            />
        }
        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    }

    render() {
        const {projectList} = this.props;
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
                            return
                                <Table.Row key={i}>
                                    {
                                        rmKey.map((key, j) => {
                                            return <Table.Cell
                                                className={"requirement-cell-length " + (key === "summary" ? "text-ellipsis" : "")}
                                                key={i + "_" + j}>
                                                {result[key]}
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
