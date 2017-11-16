import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty, dateFormat} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import Discussion from './Discussion';
import {retrieveStories} from '../../../actions/stories_action';
import {
    Link
} from 'react-router-dom';
import {priorityOptions} from '../../../res/data/dataOptions';

const header = ["Story ID", "Summary", "Priority", "Members", "Story Points", "Start Date", "End Date",
    "Duration", "Finished SP", "Progress", "Efficiency", "Quality Index"];
const rmKey = ["storyId", "summary", "priority", "memberCunt", "storyPoint", "startDate", "endDate",
    "duration", "finishedSP", "progress", "efficiency", "qualityIndex"];

class StoryList extends Component {

    pageChange(page, pageSize) {
        this.props.dispatch(retrieveStories(page, pageSize, this.props.requirement.reqId));
    }

    handleDisplayData(data, key) {
        if (key === "storyId") {
            return <Link to={`/home/story/${data[key]}`}>
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
        const {stories, dispatch} = this.props;
        return (
            <Table className="requirement-card">
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
                    stories.stories.map((result, i) => {
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
                            <Table.Row className="discussion-row">
                                <Table.Cell colSpan={rmKey.length}>
                                    <Discussion story={result} dispatch={dispatch}/>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    })
                }

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={header.length}>
                            <Pagination defaultCurrent={1} total={stories.totalElements}
                                        showQuickJumper
                                        onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default StoryList;
