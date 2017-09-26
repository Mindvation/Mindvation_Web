import React, {Component} from 'react';
import {Header, Icon, Table, Segment, Image} from 'semantic-ui-react';
import _ from 'lodash';
import {dateFormat} from '../../../util/CommUtil';

const owners = [
    {
        text: 'Bob',
        value: '43845076',
        image: require('../../../res/image/photo.jpg'),
        role: 'Front-End Dev'
    },
    {
        text: 'Frank',
        value: '43845077',
        image: require('../../../res/image/photo.jpg'),
        role: 'BA'
    },
    {
        text: 'Darcy',
        value: '43547206',
        image: require('../../../res/image/photo.jpg'),
        role: 'Scrum Master'
    },
    {
        text: 'Migun',
        value: '43798834',
        image: require('../../../res/image/photo.jpg'),
        role: 'Back-End Dev'
    }];

const demoPlan = [{
    sprint: 1,
    startDate: '2017/09/25',
    endDate: '2017/10/13',
    stories: [
        {
            storyId: 'S0001',
            demoHosts: [{owner: owners[1], demoDate: '2017/09/25'},
                {owner: owners[0], demoDate: '2017/09/30'},
                {owner: owners[3], demoDate: '2017/10/04'}]
        },
        {
            storyId: 'S0002',
            demoHosts: [{owner: owners[1], demoDate: '2017/09/25'},
                {owner: owners[2], demoDate: '2017/10/01'},
                {owner: owners[3], demoDate: '2017/10/05'}]
        },
        {
            storyId: 'S0003',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/03'},
                {owner: owners[0], demoDate: '2017/09/30'},
                {owner: owners[2], demoDate: '2017/10/08'}]
        },
        {
            storyId: 'S0004',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/06'},
                {owner: owners[0], demoDate: '2017/10/08'},
                {owner: owners[3], demoDate: '2017/10/13'}]
        }
    ]
}, {
    sprint: 2,
    startDate: '2017/10/16',
    endDate: '2017/11/03',
    stories: [
        {
            storyId: 'S0005',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/16'},
                {owner: owners[0], demoDate: '2017/10/18'},
                {owner: owners[3], demoDate: '2017/11/01'}]
        },
        {
            storyId: 'S0006',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/28'},
                {owner: owners[2], demoDate: '2017/10/30'},
                {owner: owners[3], demoDate: '2017/11/03'}]
        },
        {
            storyId: 'S0007',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/28'},
                {owner: owners[2], demoDate: '2017/10/30'},
                {owner: owners[3], demoDate: '2017/11/03'}]
        },
        {
            storyId: 'S0008',
            demoHosts: [{owner: owners[1], demoDate: '2017/10/17'},
                {owner: owners[0], demoDate: '2017/10/30'},
                {owner: owners[3], demoDate: '2017/11/01'}]
        },
        {
            storyId: 'S0009',
            demoHosts: [{owner: owners[2], demoDate: '2017/10/29'},
                {owner: owners[0], demoDate: '2017/11/01'},
                {owner: owners[3], demoDate: '2017/11/03'}]
        }
    ]
}];

class DemoCalendar extends Component {
    state = {
        demoPlan: []
    };

    componentWillMount() {
        this.getDemoPlan(1);
    }

    componentWillReceiveProps(nextProps) {
        const {sprint} = nextProps;
        this.getDemoPlan(sprint);
    }

    getDemoPlan(sprint) {
        let currSprint = sprint > 1 ? 1 : 0;
        let plan = _.cloneDeep(demoPlan[currSprint]);
        let formattedPlan = [];
        plan.stories.map((story) => {
            story.demoHosts.map((host) => {
                let index = this.getIndex(formattedPlan, host.owner);
                if (index > -1) {
                    let dateIndex = this.getDateIndex(formattedPlan[index].demos, host.demoDate);
                    if (dateIndex > -1) {
                        formattedPlan[index].demos[dateIndex].storyIds.push(story.storyId)
                    } else {
                        formattedPlan[index].demos.push({
                            storyIds: [story.storyId],
                            demoDate: host.demoDate
                        })
                    }
                } else {
                    formattedPlan.push({
                        owner: host.owner,
                        demos: [{
                            storyIds: [story.storyId],
                            demoDate: host.demoDate
                        }]
                    })
                }

            })
        });

        plan.formattedPlan = formattedPlan;

        this.setState({
            demoPlan: plan
        })
    }

    getIndex(arr, key) {
        let returnInd = -1;
        arr.some((item, i) => {
            if (item.owner.value === key.value) {
                returnInd = i;
                return true;
            }
        });
        return returnInd;
    }

    getDateIndex(arr, date) {
        let returnInd = -1;
        arr.some((item, i) => {
            if (item.demoDate === date) {
                returnInd = i;
                return true;
            }
        });
        return returnInd;
    }

    checkDetail = (event, storyId) => {
        event.stopPropagation();
        const {storyDetail} = this.props;
        storyDetail && storyDetail(storyId);
    };

    render() {
        const {demoPlan} = this.state;
        const titleList = () => {
            let titleRes = [(<Table.HeaderCell key="test1" textAlign="center"
                                               rowSpan='1'>Team Member</Table.HeaderCell>)];
            let dateStart = new Date(demoPlan.startDate);
            let dateEnd = new Date(demoPlan.endDate);
            for (let i = dateStart; i <= dateEnd; i = new Date(dateStart.setDate(dateStart.getDate() + 1))) {
                titleRes.push(<Table.HeaderCell textAlign="center" key={i}
                                                rowSpan='1'>{dateFormat(dateStart, "MM-dd")}</Table.HeaderCell>)
            }
            return titleRes
        };

        const dateList = (demos) => {
            let dateStart = new Date(demoPlan.startDate);
            let dateEnd = new Date(demoPlan.endDate);
            let dateRes = [];
            for (let i = dateStart; i <= dateEnd; i = new Date(dateStart.setDate(dateStart.getDate() + 1))) {
                let todayDemos = [];
                demos.map((demo) => {
                    if (new Date(demo.demoDate) - dateStart === 0) {
                        todayDemos = demo.storyIds;
                    }
                });

                if (todayDemos.length > 0) {
                    dateRes.push(<Table.Cell textAlign="center" key={i}>{todayDemos.map((id, j) => {
                        return <div key={j} className="link" onClick={(event) => this.checkDetail(event, id)}>{id}</div>
                    })}</Table.Cell>)
                } else {
                    dateRes.push(<Table.Cell key={i}/>)
                }
            }

            return dateRes;
        };

        const rowList = () => {
            let rowRes = [];
            demoPlan.formattedPlan.map((item, j) => {
                rowRes.push(<Table.Row key={j}>
                        <Table.Cell>
                            <div style={{display: 'inline-flex'}}>
                                <div style={{marginRight: '1em'}}>{item.owner.role}</div>
                                <Image avatar src={item.owner.image}/>
                                {item.owner.text}
                            </div>
                        </Table.Cell>
                        {dateList(item.demos)}
                    </Table.Row>
                )
            });
            return rowRes;
        };

        return (
            <div className="components-item">
                <Header as='h3'>
                    <Icon name='calendar'/>
                    <Header.Content>
                        Demo Calendar
                    </Header.Content>
                </Header>
                <Segment>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                {titleList()}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {rowList()}
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        );
    }
}

export default DemoCalendar;