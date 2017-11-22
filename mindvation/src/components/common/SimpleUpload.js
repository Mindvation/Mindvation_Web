import React, {Component} from 'react';
import {Upload} from 'antd';
import Message from './Message';
import PropTypes from 'prop-types';
import {url} from '../../util/ServiceUrl';
import {getStaffId} from '../../util/UserStore';

let messageNode;

class SimpleUpload extends Component {
    state = {
        fileList: [],
        uploading: false
    };

    handleChange = ({file, fileList}) => {
        this.setState({fileList});
        if (file.status === 'done') {
            messageNode.getWrappedInstance().success("uploadSuccess");
            const {callback} = this.props;
            if (callback) callback(file);
            this.setState({
                uploading: false
            });
        } else if (file.status === 'error') {
            messageNode.getWrappedInstance().error("uploadFail");
            this.setState({
                uploading: false
            });
        } else {
            this.setState({
                uploading: true
            });
        }
    };

    render() {
        const {fileList, uploading} = this.state;
        const {uploadButton} = this.props;

        const props = {
            name: 'mFile',
            action: url.uploadFile,
            headers: {
                authorization: 'authorization-text',
                'Access-Control-Allow-Origin': '*',
                'Access-Token': sessionStorage.getItem('access_token') || ''
            },
            data: {
                "creatorId": getStaffId()
            },
            onChange: this.handleChange
        };
        return (
            <div className="simple-upload">
                <Upload {...props}
                        listType='picture'
                        fileList={fileList}
                        disabled={uploading}
                >
                    {uploadButton}
                </Upload>
                <Message ref={node => messageNode = node}/>
            </div>
        );
    }
}

SimpleUpload.propTypes = {
    uploadButton: PropTypes.object,
    callback: PropTypes.func
};

export default SimpleUpload;