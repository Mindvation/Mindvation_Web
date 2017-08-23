import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';

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

const priorityOptions = [
    {
        text: 'High',
        value: 'h'
    },
    {
        text: 'Medium',
        value: 'm'
    },
    {
        text: 'Low',
        value: 'l'
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
                    <Header as="h3" className="modal-header">Additional Info</Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='tag'/>
                    <Header.Content>
                        Tags
                    </Header.Content>
                </Header>
                <Select icon="flag" options={priorityOptions} label="Priority" placeHolder="Priority"/>
                <Select icon="user" options={assignOptions} multiple={true} label="Leaders" search={true}
                        placeHolder="Leaders"
                        horizontal={true}/>
                <DatePicker icon="clock" label="Start / End Date"
                            placeHolder={["Start Date", "End Date"]}
                            range={true}
                />
                <Header as='h4'>
                    <Icon name='file'/>
                    <Header.Content>
                        Choose Project Models
                    </Header.Content>
                </Header>
            </Modal.Content>
        );
    }
}

export default OtherInfo;
