import React, {Component} from 'react';
import {Table, Image, Checkbox} from 'semantic-ui-react';
import {isEmpty} from '../../../util/CommUtil';
import TagList from './TagListForMember';
import {FormattedMessage} from 'react-intl';

const header = [
    {text: ""},
    {text: "Name"},
    {text: "Tags"},
    {text: "Efficiency", sortKey: "efficiency"},
    {text: "Contribution", sortKey: "contribution"},
    {text: "Rec.", sortKey: "rec"}];
const memberKey = ["selected", "name", "tags", "efficiency", "contribution", "rec"];

class Members extends Component {
    state = {
        column: null,
        data: this.props.members,
        direction: null,
        selectedMembers: []
    };

    componentWillReceiveProps(nextProps) {
        const {members} = nextProps;
        this.setState({
            data: members
        })
    }

    toggleSelected(member) {
        let tempMembers = this.state.selectedMembers;
        if (tempMembers.indexOf(member) > -1) {
            tempMembers.splice(tempMembers.indexOf(member), 1);
        } else {
            tempMembers.push(member);
        }

        this.setState({
            selectedMembers: tempMembers
        })
    }

    getSelectedMembers() {
        return this.state.selectedMembers
    }

    getMemberDesc = (result, key) => {
        if (key === "selected") {
            return <Checkbox onClick={() => this.toggleSelected(result)}/>
        }
        if (key === "tags" && !isEmpty(result[key])) {
            return <TagList tagList={result[key]} shortTag={true}/>
        }
        if (key === "name" && !isEmpty(result[key])) {
            return <div>
                <Image src={result[key].image.src} avatar/>
                <span>{result[key].text}</span>
            </div>
        }
        if (key === "rec" && !isEmpty(result[key])) {
            return result[key] + "%";
        }
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    handleSort = clickedColumn => () => {
        const {column, data, direction} = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: this.sortData(data, clickedColumn),
                direction: 'ascending',
            });

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    sortData(data, column) {
        return data.sort(function (a, b) {
            if (a[column] - b[column] > 0) {
                return -1;
            }
            return 1;
        })
    }

    render() {
        const {column, data, direction} = this.state;
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((result, i) => {
                                return result.sortKey ?
                                    <Table.HeaderCell key={i}
                                                      className="pointer-cursor"
                                                      sorted={column === result.sortKey ? direction : null}
                                                      onClick={this.handleSort(result.sortKey)}>

                                        {result.text ? <FormattedMessage
                                            id={result.text}
                                        /> : ""}
                                    </Table.HeaderCell> :
                                    <Table.HeaderCell key={i}>
                                        {result.text ? <FormattedMessage
                                            id={result.text}
                                        /> : ""}
                                    </Table.HeaderCell>
                            })
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    memberKey.map((key, j) => {
                                        return <Table.Cell
                                            key={i + "_" + j}>
                                            {this.getMemberDesc(result, key)}
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

export default Members;
