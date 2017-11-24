import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';
import Simditor from '../../common/Simditor';

class BasicInfo extends Component {
    getInfo = () => {
        return {
            "projectName": this.nameNode.getWrappedInstance().getValue(),
            "description": this.projectDescNode.getValue()
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
                               this.nameNode = node
                           }}
                           placeHolder="projectNamePlaceHolderDesc"
                           defaultValue={info.projectName}
                    />
                    <Simditor
                        label="Description"
                        required={true}
                        ref={node => {
                            this.projectDescNode = node
                        }}
                        defaultValue={info.description}/>
                </div>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
