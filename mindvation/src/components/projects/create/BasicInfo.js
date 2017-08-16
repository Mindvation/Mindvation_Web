import React, {Component} from 'react';
import {Header, Icon, Modal, Input, Form, TextArea} from 'semantic-ui-react';

let name;
let description;

class BasicInfo extends Component {

    getBasicInfo = () => {
        return {
            "projectId": "P002",
            "projectName": name.inputRef.value,
            "Description": description.ref.value
        }
    };

    render() {
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">Basic info</Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='product hunt'/>
                    <Header.Content>
                        Project Name
                    </Header.Content>
                </Header>
                <Input fluid ref={node => {
                    name = node
                }}/>
                <Header as='h4'>
                    <Icon name='book'/>
                    <Header.Content>
                        Description
                    </Header.Content>
                </Header>
                <Form>
                    <TextArea ref={node => {
                        description = node
                    }} autoHeight style={{minHeight: 100}}/>
                </Form>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
