import React, {Component} from 'react';
import {Table, Popup} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {retrieveProjects} from '../../actions/projects_action';
import {getDesc, isEmpty, dateFormat} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {
    Link
} from 'react-router-dom';
import {priorityOptions} from '../../res/data/dataOptions';

const header = ["Project ID", "Project Name", "Description", "Priority", "Start Date", "End Date", "Efficiency", "Progress", "Story Qty", "Story Points", "Checklist Qty", "CR Qty", "CR SPs", "CR Cost", "SPs Cost", "CR Rate"];
const projectKey = ['projId', 'name', 'description', 'priority', 'startDate', 'endDate', 'efficiency', 'progress', 'storyQty', 'storyPointQty', 'checklistQty', 'crStoryQty', 'crStoryPointQty', 'crCost', 'cost', 'crRate'];

class ProjectsList extends Component {
    componentDidMount() {
        this.props.dispatch(retrieveProjects(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(retrieveProjects(page, pageSize));
    }

    handleDisplayData(data, key) {
        if (key === "projId") {
            return <Link to={`projects/${data[key]}`}>
                {data[key]}
            </Link>
        }
        if (key === "priority" && !isEmpty(data[key])) {
            return getDesc(priorityOptions, data[key]);
        }
        if (key === "checklistQty") {
            if (data.checklists) {
                return data.checklists.length;
            }
            return 0;
        }
        if (key === "description") {
            return <Popup
                className="pre-line"
                trigger={<div className="table-desc-text" dangerouslySetInnerHTML={{__html: data[key]}}/>}
                content={<div className="simditor table-desc-simditor">
                    <div className="simditor-body" dangerouslySetInnerHTML={{__html: data[key]}}/>
                </div>}
                basic
                position="bottom center"
                style={{maxWidth: '50%'}}
            />
        }
        if ((key === "startDate" || key === "endDate") && !isEmpty(data[key])) {
            return dateFormat(new Date(data[key]), "yyyy-MM-dd");
        }
        if (isEmpty(data[key])) {
            return 'N/A';
        }
        return data[key];
    }

    render() {
        const {projectList} = this.props;
        return (
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return <Table.HeaderCell className="table-cell-length" key={i}>
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
                        projectList.projects.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    projectKey.map((key, j) => {
                                        return <Table.Cell
                                            className={"table-cell-length"}
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
                            <Pagination defaultCurrent={1} total={projectList.totalElements}
                                        onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ProjectsList;
