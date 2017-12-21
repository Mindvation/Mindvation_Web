import React, {Component} from 'react';
import {Upload} from 'antd';
import {List} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {url} from '../../util/ServiceUrl';
import Message from './Message';
import {getStaffId} from '../../util/UserStore';
import Image from '../common/Image';

class UploadFile extends Component {
    state = {
        fileList: this.props.defaultFileList || []
    };

    handleChange = ({file, fileList}) => {
        this.setState({fileList});
        if (file.status === 'done') {
            this.setFileUrl(fileList, file);
            this.messageNode.getWrappedInstance().success("uploadSuccess");
            this.setState({fileList: fileList});
        } else if (file.status === 'error') {
            this.messageNode.getWrappedInstance().error("uploadFail");
            let tempList = this.state.fileList;
            tempList.splice(tempList.indexOf(file), 1);
            this.setState({
                fileList: tempList
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

    getInfo = () => {
        return this.state.fileList;
    };

    deleteFile = (file) => {
        let index = this.getFileIndex(file);
        if (index > -1) {
            let tempList = this.state.fileList;
            tempList.splice(index, 1);
            this.setState({
                fileList: tempList
            });
        }
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
        const {label, required} = this.props;
        const {fileList} = this.state;
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
            onChange: this.handleChange,
            showUploadList: false
        };

        return (
            <div className="components-item last-components-item">
                <div className="model-second-header">
                    {/*{icon ? <Icon name={icon}/> : null}*/}
                    <div className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </div>
                </div>
                {/*<input id="file" type="file" name="name"/>
                <button onClick={this.testUpload}>Upload</button>*/}
                <Upload {...props}
                        fileList={fileList}
                >
                    <div className="upload-file-button">
                        + <FormattedMessage
                        id='selectFile'
                        defaultMessage='Select File'
                    />
                    </div>
                </Upload>
                {fileList.length > 0 ? <List horizontal>
                    {fileList.map((file, i) => {
                        return <List.Item key={i}>
                            <div className="file-item">
                                <div className="file-name">
                                    <a href={file.url}
                                       target="_blank" rel="noopener noreferrer">{file.name}</a>
                                </div>
                                {file.status === "uploading" ? <div className="file-delete-button">
                                    <Image style={{marginRight: 0}} name="loading" type="gif"/>
                                </div> : <div className="file-delete-button" onClick={() => this.deleteFile(file)}>
                                    <Image style={{marginRight: 0}} name="delete"/>
                                </div>}
                                {/*<div className="file-delete-button">
                                    <Image style={{marginRight: 0}} name="loading" type="gif"/>
                                </div>*/}
                            </div>
                        </List.Item>
                    })}
                </List> : null}
                <Message ref={node => this.messageNode = node}/>
            </div>
        );
    }
}

UploadFile.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    defaultFileList: PropTypes.array
};

export default UploadFile;