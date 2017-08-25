import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {getDesc} from '../../../util/CommUtil';

const header = ["ID Number", "Description", "Follower", "Assigner", "Create Date", "Latest Update", "Status"];
const checklistKey = ["idNumber", "description", "follower", "assigner", "createDate", "lastUpdateDate", "status"];

class Checklist extends Component {

    render() {
        const {checklist} = this.props;
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return <Table.HeaderCell collapsing key={i}>{result}</Table.HeaderCell>
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
                                        return <Table.Cell collapsing key={i + "_" + j}>
                                            {key === "follower" ? getDesc(global.dummyData.assignOptions, result[key]) : result[key]}
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
