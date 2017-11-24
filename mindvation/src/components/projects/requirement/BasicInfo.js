import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import Simditor from '../../common/Simditor';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';

class BasicInfo extends Component {
    getInfo = () => {
        return {
            "summary": this.summary.getWrappedInstance().getValue(),
            "description": this.desc.getValue()
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
                               this.summary = node
                           }}
                           defaultValue={info.summary}
                    />
                    <Simditor label="Description" required={true}
                              ref={node => {
                                  this.desc = node
                              }}
                              defaultValue={info.description}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default BasicInfo;
