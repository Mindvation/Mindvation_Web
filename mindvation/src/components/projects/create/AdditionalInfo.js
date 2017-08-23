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

const contingencyOptions = [
    {
        text: '10%',
        value: '10'
    },
    {
        text: '20%',
        value: '20'
    },
    {
        text: '30%',
        value: '30'
    },
    {
        text: '50%',
        value: '50'
    },
    {
        text: '75%',
        value: '75'
    },
    {
        text: '100%',
        value: '100'
    },
    {
        text: '150%',
        value: '150'
    },
    {
        text: '200%',
        value: '200'
    },
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
                        placeHolder="Leaders"/>
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
                <Select options={assignOptions} label="Software Model"
                        placeHolder="Software Model"
                        horizontal={true}/>
                <Select options={assignOptions} label="Engineering Model"
                        placeHolder="Engineering Model"
                        horizontal={true}/>
                <Select options={assignOptions} label="Business Requirement Model"
                        placeHolder="Business Requirement Models"
                        horizontal={true}/>
                <Select options={assignOptions} label="Technique Model"
                        placeHolder="Technique Model"
                        horizontal={true}/>
                <Select icon="percent" options={contingencyOptions} label="Contingency"
                        placeHolder="Contingency"/>
            </Modal.Content>
        );
    }
}

export default OtherInfo;
