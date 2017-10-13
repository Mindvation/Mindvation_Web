import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import {FormattedMessage} from 'react-intl';

class BasicInfo extends Component {
    state = {checked: false};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "summary": this.summary.getWrappedInstance().getValue(),
            "description": this.desc.getWrappedInstance().getValue()
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
                           this.summary = node
                       }}
                       checked={this.state.checked}
                       defaultValue={info.summary}
                />
                <TextArea label="Description" icon="book" required={true}
                          ref={node => {
                              this.desc = node
                          }}
                          checked={this.state.checked}
                          defaultValue={info.description}
                />
            </Modal.Content>
        );
    }
}

export default BasicInfo;
