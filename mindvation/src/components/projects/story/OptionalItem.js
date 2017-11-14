import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';
import Image from '../../common/Image';

class OptionalItem extends Component {
    getInfo = () => {
        return {
            fileList: this.uploadFileNode.getInfo()
        };
    };

    render() {
        const {info = {}, isEdit} = this.props;
        return (
            <Modal.Content>
                <div className={isEdit ? "edit-modal-description" : "modal-description"}>
                    <div className="modal-header">
                        <Image name={isEdit ? "optional_info_black" : "optional_info"}/>
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </div>
                </div>
                <div className={isEdit ? "" : "model-container"}>
                    <UploadFile label="Attachments" icon="attach" ref={node => this.uploadFileNode = node}
                                defaultFileList={info.fileList}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
