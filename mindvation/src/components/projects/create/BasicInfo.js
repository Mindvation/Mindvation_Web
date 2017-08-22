import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';

let name;
let description;

class BasicInfo extends Component {

    getBasicInfo = () => {
        return {
            "projectId": "P002",
            "projectName": name.getValue(),
            "Description": description.getValue()
        }
    };

    render() {
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">Basic info</Header>
                </Modal.Description>
                <Input label="Project Name" icon="product hunt" required={true} checked={false}
                       ref={node => {
                           name = node
                       }}/>
                <TextArea label="Description" icon="book" required={true} checked={false}
                          ref={node => {
                              description = node
                          }}/>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
