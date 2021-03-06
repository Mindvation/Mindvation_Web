import React, {Component} from 'react';
import {Table, Image, Checkbox, Icon} from 'semantic-ui-react';
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
        data: [],
        originData: [],
        direction: null,
        selectedMembers: []
    };

    componentWillMount() {
        this.handleMembersData(this.props.members, this.props.originMembers)
    }

    componentWillReceiveProps(nextProps) {
        const {members} = nextProps;
        const {originMembers} = this.props;
        this.handleMembersData(members, originMembers)
    }

    handleMembersData(members, originMembers) {
        if (originMembers && originMembers.length > 0) {
            let tempMebers = [];
            if (members && members.length > 0) {
                members.map((member) => {
                    if (!this.existMember(originMembers, member)) {
                        tempMebers.push(member)
                    }
                })
            }
            this.setState({
                data: tempMebers,
                originData: originMembers,
                selectedMembers: Object.assign([], originMembers)
            });
        } else {
            this.setState({
                data: members
            })
        }
    }

    existMember(originMembers, member) {
        let flag = false;
        originMembers.some((orgMember) => {
            if (orgMember.name.value === member.name.value) {
                flag = true;
                return true;
            }
        });
        return flag;
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
            return <Checkbox checked={this.state.selectedMembers.indexOf(result) > -1}
                             onClick={() => this.toggleSelected(result)}/>
        }
        if (key === "tags") {
            return (result[key] && result[key].length > 0) ? <TagList tagList={result[key]} shortTag={true}/> : 'N/A'
        }
        if (key === "name" && !isEmpty(result[key])) {
            return <div>
                <Image src={result[key].image.src} avatar/>
                <span>{result[key].text}</span>
            </div>
        }
        /*if (key === "rec" && !isEmpty(result[key])) {
            return result[key] + "%";
        }*/
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
        const {column, data, originData, direction} = this.state;
        return (
            <Table textAlign="center">
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
                                        <Icon name="arrow down"/>
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
                {
                    originData && originData.length > 0 ?
                        <Table.Body className="table-origin-data">
                            {
                                originData.map((result, i) => {
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
                        </Table.Body> : null
                }
                <Table.Body>
                    {
                        data.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    memberKey.map((key, j) => {
                                        return <Table.Cell
                                            className={key === "tags" ? "table-td-tags" : ""}
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
