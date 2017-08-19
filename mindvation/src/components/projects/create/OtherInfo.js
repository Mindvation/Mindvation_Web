import React, {Component} from 'react';
import {Header, Icon, Modal, Input, Button, Form, TextArea, Dropdown} from 'semantic-ui-react';
import {DatePicker} from 'antd';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const assignOptions = [
    {
        text: 'Bob',
        value: '43845076',
        image: {avatar: true, src: require('../../../res/image/photo.jpg')}
    },
    {
        text: 'Frank',
        value: '43845077',
        image: {avatar: true, src: require('../../../res/image/photo.jpg')}
    },
    {
        text: 'Darcy',
        value: '43547206',
        image: {avatar: true, src: require('../../../res/image/photo.jpg')}
    },
    {
        text: 'Migun',
        value: '43798834',
        image: {avatar: true, src: require('../../../res/image/photo.jpg')}
    }
];

class OtherInfo extends Component {

    state = {};

    dateChange = (data) => {
        console.info(data);
    };

    render() {

        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">Other Info</Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='clock'/>
                    <Header.Content>
                        Start / End Date
                    </Header.Content>
                </Header>
                <RangePicker
                    ranges={{Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')]}}
                    onChange={this.dateChange}
                />
                <Header as='h4'>
                    <Icon name='user'/>
                    <Header.Content>
                        Assign To
                    </Header.Content>
                </Header>
                <Dropdown placeholder='Assgin to' fluid search selection options={assignOptions}/>
                <Header as='h4'>
                    <Icon name='attach'/>
                    <Header.Content>
                        Attachments
                    </Header.Content>
                </Header>

            </Modal.Content>
        );
    }
}

export default OtherInfo;
