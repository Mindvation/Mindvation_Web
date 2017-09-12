import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';
import {FormattedMessage} from 'react-intl';

let summary, desc, functionLabelNode;

class BasicInfo extends Component {
    state = {checked: false};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "summary": summary.getWrappedInstance().getValue(),
            "description": desc.getWrappedInstance().getValue(),
            "functionLabel": functionLabelNode.getWrappedInstance().getValue()
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
                           summary = node
                       }}
                       checked={this.state.checked}
                       defaultValue={info.summary}
                />
                <TextArea label="Description" icon="book" required={true}
                          ref={node => {
                              desc = node
                          }}
                          checked={this.state.checked}
                          defaultValue={info.description}
                />
                <Select icon="sitemap" options={global.dummyData.functionOptions}
                        search={true} required={true} checked={this.state.checked}
                        label="Process/Function Label"
                        placeHolder="functionLabelPlaceHolderDesc"
                        ref={node => {
                            functionLabelNode = node
                        }}
                        defaultValue={info.functionLabel}
                />
            </Modal.Content>
        );
    }
}

export default BasicInfo;
