import React, {Component} from 'react';
import {Icon, Menu, Table} from 'semantic-ui-react';

/*const header = ["Project ID", "Project Name", "Description", "Priority", "Start Date", "End Date", "Efficiency", "Progress", "Story Qty", "Story Points", "Check List Qty", "CR Qty", "CR SPs", "CR Cost", "SPs Cost", "CR Rate"];
const datas = [["P0001", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0002", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0003", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0004", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0005", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0006", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0007", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0008", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0009", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0010", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0011", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0012", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0013", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0014", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0015", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0016", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0017", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"],
    ["P0018", "DMS", "A system to solve industry project issues which include.....", "High", "2017-04-05", "2017-07-20", "87'", "90%", "210", "26", "46.5", "20M", "7", "15", "12M", "24.4%"]
];*/

const header = ["Project ID", "Project Name", "Description", "Priority", "Start Date", "End Date", "Efficiency", "Progress", "Story Qty", "Story Points", "Check List Qty", "CR Qty", "CR SPs", "CR Cost", "SPs Cost", "CR Rate"];
const projectKey = ['projectId', 'projectName', 'description', 'checklist'];

class ProjectsList extends Component {
    render() {
        const {projectList} = this.props;
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return <Table.HeaderCell  key={i}>{result}</Table.HeaderCell>
                            })
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        projectList.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    projectKey.map((key, j) => {
                                        return <Table.Cell  key={i + "_" + j}>
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
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='left chevron'/>
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='right chevron'/>
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default ProjectsList;
