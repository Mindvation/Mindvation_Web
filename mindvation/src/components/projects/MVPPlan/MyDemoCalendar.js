import React, {Component} from 'react';
import {Header, Icon, Table, Segment} from 'semantic-ui-react';
import _ from 'lodash';
import {dateFormat} from '../../../util/CommUtil';

const demoPlan = [{
    sprint: 1,
    startDate: '2017/09/25',
    endDate: '2017/10/13',
    stories: [
        {
            storyId: 'S0001',
            demoDate: '2017/09/28'
        },
        {
            storyId: 'S0002',
            demoDate: '2017/10/02'
        },
        {
            storyId: 'S0003',
            demoDate: '2017/10/02'
        },
        {
            storyId: 'S0004',
            demoDate: '2017/10/13'
        }
    ]
}, {
    sprint: 2,
    startDate: '2017/10/16',
    endDate: '2017/11/03',
    stories: [
        {
            storyId: 'S0005',
            demoDate: '2017/10/16'
        },
        {
            storyId: 'S0006',
            demoDate: '2017/10/20'
        },
        {
            storyId: 'S0007',
            demoDate: '2017/10/20'
        },
        {
            storyId: 'S0007',
            demoDate: '2017/11/01'
        },
        {
            storyId: 'S0008',
            demoDate: '2017/11/03'
        }
    ]
}];

class MyDemoCalendar extends Component {
    state = {
        sprint: 1,
        demoPlan: []
    };

    componentWillMount() {
        this.getDemoPlan(this.props.sprint);
    }

    componentWillReceiveProps(nextProps) {
        const {sprint} = nextProps;
        if (sprint === this.props.sprint) return;
        this.getDemoPlan(sprint);
    }

    getDemoPlan(sprint) {
        let currSprint = sprint > 1 ? 1 : 0;
        let plan = _.cloneDeep(demoPlan[currSprint]);
        this.setState({
            demoPlan: plan
        })
    }

    checkDetail = (event, storyId) => {
        event.stopPropagation();
        const {storyDetail} = this.props;
        storyDetail && storyDetail(storyId);
    };

    render() {
        const {demoPlan} = this.state;
        const {sprint} = this.props;
        const dateList = (() => {
            let titleRes = [];
            let dataRes = [];
            let dateStart = new Date(demoPlan.startDate);
            let dateEnd = new Date(demoPlan.endDate);
            for (let i = dateStart; i <= dateEnd; i = new Date(dateStart.setDate(dateStart.getDate() + 1))) {
                titleRes.push(<Table.HeaderCell textAlign="center" key={i}
                                                rowSpan='1'>{dateFormat(dateStart, "MM-dd")}</Table.HeaderCell>)
                let demos = [];
                demoPlan.stories.map((story) => {
                    if (new Date(story.demoDate) - dateStart === 0) {
                        demos.push(story)
                    }
                });

                if (demos.length > 0) {
                    dataRes.push(<Table.Cell textAlign="center" key={i}>{demos.map((demo, j) => {
                        return <div key={j} className="link"
                                    onClick={(event) => this.checkDetail(event, demo.storyId)}>{demo.storyId}</div>
                    })}</Table.Cell>)
                } else {
                    dataRes.push(<Table.Cell key={i}/>)
                }
            }
            return [titleRes, dataRes]
        })();

        return (
            <div className="components-item">
                <Header as='h3'>
                    <Icon name='calendar'/>
                    <Header.Content>
                        My Demo Calendar(Sprint {sprint})
                    </Header.Content>
                </Header>
                <Segment>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                {dateList[0]}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center" colSpan='19'>MVP 1</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                {dateList[1]}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        );
    }
}

export default MyDemoCalendar;