import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';

let name;
let projectDesc;

class BasicInfo extends Component {
    state = {checked: false};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "projectName": name.getValue(),
            "description": projectDesc.getValue()
        }
    };

    render() {
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">Basic info</Header>
                </Modal.Description>
                <Input label="Project Name" icon="product hunt" required={true}
                       ref={node => {
                           name = node
                       }}
                       checked={this.state.checked}
                />
                <TextArea label="Description" icon="book" required={true}
                          ref={node => {
                              projectDesc = node
                          }}
                          checked={this.state.checked}
                />
            </Modal.Content>
        );
    }
}

export default BasicInfo;
