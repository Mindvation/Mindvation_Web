import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';
import Simditor from '../../common/Simditor';

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
                    <Input label="Project Name" required={true}
                           ref={node => {
                               name = node
                           }}
                           checked={this.state.checked}
                           placeHolder="projectNamePlaceHolderDesc"
                           defaultValue={info.projectName}
                    />
                    <TextArea label="Description" required={true}
                              ref={node => {
                                  projectDesc = node
                              }}
                              checked={this.state.checked}
                              defaultValue={info.description}
                    />
                    <Simditor label="Description" required={true} defaultValue="<p>asdadsd</p><br><p>13123123</p>"/>
                </div>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
