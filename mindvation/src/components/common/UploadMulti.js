import React, {Component} from 'react';
import {Upload, Carousel} from 'antd';
import {Image, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Message from './Message';
import PropTypes from 'prop-types';
import {url} from '../../util/ServiceUrl';
import {addFileToTask, removeFileFromTask} from '../../util/Service';
import {getStaffId} from '../../util/UserStore';
import MVImage from './Image';

let messageNode;

class UploadMulti extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.task ? this.props.task.fileList || [] : [],
        displayFileList: this.props.task ? this.props.task.fileList || [] : [],
        uploading: false
    };

    handleChange = ({file, fileList}) => {
        console.info(file.status);
        this.setState({fileList});
        if (file.status === 'done') {
            this.setFileUrl(fileList, file);
            messageNode.getWrappedInstance().success("uploadSuccess");
            this.setState({displayFileList: Object.assign([], fileList), uploading: false});
            addFileToTask(this.props.task, file);
        } else if (file.status === 'error') {
            messageNode.getWrappedInstance().error("uploadFail");
            let tempList = this.state.fileList;
            tempList.splice(tempList.indexOf(file), 1);
            this.setState({
                fileList: tempList,
                uploading: false
            });
        } else {
            this.setState({
                uploading: true
            });
        }
    };

    setFileUrl = (fileList, file) => {
        fileList.some((item) => {
            if (item.uid === file.uid) {
                item.url = file.response.responseBody.url;
                item.fileId = file.response.responseBody.id;
                return true;
            }
        })
    };

    deleteFile = (file) => {
        removeFileFromTask(this.props.task, file, function () {
            let index = this.getFileIndex(file);
            if (index > -1) {
                let tempList = this.state.fileList;
                tempList.splice(index, 1);
                this.setState({
                    fileList: tempList,
                    displayFileList: tempList
                });
            }
        }.bind(this));
    };

    getFileIndex = (file) => {
        let index = -1;
        this.state.fileList.some((item, i) => {
            if (item.uid === file.uid) {
                index = i;
                return true;
            }
        });
        return index;
    };

    render() {
        const {fileList, displayFileList, uploading} = this.state;
        const {readOnly} = this.props;
        const uploadButton = (
            readOnly ? null : <div>
                <FormattedMessage
                    id='uploadAttachment'
                    defaultMessage='Upload Attachment'
                />
            </div>
        );
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
            <div className="upload-multi">
                <div className="status-header upload-multi-title">
                    <MVImage name="attachment"/>
                    <FormattedMessage
                        id='Attachments'
                        defaultMessage='Attachments'
                    />
                </div>
                <Carousel>
                    {displayFileList.length > 0 ? displayFileList.map((file) => {
                        return <div key={file.uid}>
                            <div className="list-content">
                                <Image src={file.thumbUrl}/>
                                <div className="list-actions-content">
                                <span className="list-actions">
                                <a href={file.url}
                                   target="_blank" rel="noopener noreferrer">
                                    <Icon name="eye" className="list-action-icon"/>
                                </a>
                                    {readOnly ? null : <Icon onClick={() => this.deleteFile(file)} name="trash"
                                                             className={"list-action-icon pointer-cursor"}/>}
                                </span>
                                </div>
                            </div>
                        </div>
                    }) : <div className="list-no-file">
                        <FormattedMessage
                            id='noFile'
                            defaultMessage='No File'
                        />
                    </div>}
                </Carousel>
                <div className="upload-multi-button">
                    <Upload {...props}
                            listType='picture'
                            fileList={fileList}
                            disabled={readOnly || uploading}
                    >
                        {uploadButton}
                    </Upload>
                </div>
                <Message ref={node => messageNode = node}/>
            </div>
        );
    }
}

UploadMulti.propTypes = {
    readOnly: PropTypes.bool,
    defaultFileList: PropTypes.array
};

export default UploadMulti;