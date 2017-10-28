import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';

class OptionalItem extends Component {
    getInfo = () => {
        return {
            fileList: this.uploadFileNode.getInfo()
        };
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </Header>
                </Modal.Description>
                <UploadFile label="Attachments" icon="attach" ref={node => this.uploadFileNode = node}
                            defaultFileList={info.fileList}
                />
            </Modal.Content>
        );
    }
}

export default OptionalItem;
