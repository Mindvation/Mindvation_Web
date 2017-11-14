import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';

let summary, desc;

class BasicInfo extends Component {
    state = {checked: false};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "summary": summary.getWrappedInstance().getValue(),
            "description": desc.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}, isEdit} = this.props;
        return (
            <Modal.Content>
                <div className={isEdit ? "edit-modal-description" : "modal-description"}>
                    <div className="modal-header">
                        <Image name={isEdit ? "basic_info_black" : "basic_info"}/>
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </div>
                </div>
                <div className={isEdit ? "" : "model-container"}>
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
                </div>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
