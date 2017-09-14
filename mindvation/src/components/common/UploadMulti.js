import React, {Component} from 'react';
import {Upload, Carousel} from 'antd';
import {Image, Button, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Message from './Message';

let messageNode;

class UploadMulti extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        displayFileList: [],
        uploading: false
    };

    handleChange = ({file, fileList}) => {
        console.info(file.status);
        this.setState({fileList});
        if (file.status === 'done') {
            messageNode.getWrappedInstance().success("uploadSuccess");
            this.setState({displayFileList: Object.assign([], fileList), uploading: false});
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

    deleteFile = (file) => {
        let index = this.getFileIndex(file);
        if (index > -1) {
            let tempList = this.state.fileList;
            tempList.splice(index, 1);
            this.setState({
                fileList: tempList,
                displayFileList: tempList
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
        const {fileList, displayFileList, uploading} = this.state;
        const uploadButton = (
            <Button loading={uploading}>
                <Icon name="upload"/>
                <FormattedMessage
                    id='uploadAttachment'
                    defaultMessage='Upload Attachment'
                />
            </Button>
        );
        return (
            <div className="upload-multi">
                <Carousel>
                    {displayFileList.length > 0 ? displayFileList.map((file) => {
                        return <div key={file.uid}>
                            <div className="list-content">
                                <Image src={file.thumbUrl}/>
                                <div className="list-actions-content">
                                <span className="list-actions">
                                <a href="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                   target="_blank" rel="noopener noreferrer">
                                    <Icon name="eye" className="list-action-icon"/>
                                </a>
                                    <Icon onClick={() => this.deleteFile(file)} name="trash"
                                          className={"list-action-icon pointer-cursor"}/>
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
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
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

export default UploadMulti;