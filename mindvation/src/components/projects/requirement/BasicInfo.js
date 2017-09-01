import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import {FormattedMessage} from 'react-intl';

let name;
let projectDesc;

class BasicInfo extends Component {
    state = {checked: false};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "projectName": name.getWrappedInstance().getValue(),
            "description": projectDesc.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </Header>
                </Modal.Description>
                <Input label="Summary" icon="product hunt" required={true}
                       ref={node => {
                           name = node
                       }}
                       checked={this.state.checked}
                       defaultValue={info.projectName}
                />
                <TextArea label="Description" icon="book" required={true}
                          ref={node => {
                              projectDesc = node
                          }}
                          checked={this.state.checked}
                          defaultValue={info.description}
                />
            </Modal.Content>
        );
    }
}

export default BasicInfo;
