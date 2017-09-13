import React, {Component} from 'react';
import {Upload, Carousel, message} from 'antd';
import {Image, Button, Icon, Header} from 'semantic-ui-react';

class UploadMulti extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: 1,
            url: require('../../res/image/photo.jpg'),
            thumbUrl: require('../../res/image/photo.jpg')
        }, {
            uid: 2,
            url: require('../../res/image/BurnDown.png'),
            thumbUrl: require('../../res/image/BurnDown.png')
        }],
        displayFileList: [{
            uid: 1,
            url: require('../../res/image/photo.jpg'),
            thumbUrl: require('../../res/image/photo.jpg')
        }, {
            uid: 2,
            url: require('../../res/image/BurnDown.png'),
            thumbUrl: require('../../res/image/BurnDown.png')
        }],
        uploading: false
    };

    handleChange = ({file, fileList}) => {
        console.info(file.status);
        this.setState({fileList});
        if (file.status === 'done') {
            message.success('文件上传成功', 5);
            this.setState({displayFileList: Object.assign([], fileList), uploading: false});
        } else if (file.status === 'error') {
            message.error('文件上传失败', 5);
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
                <Icon name="upload"/> Upload Attachment
            </Button>
        );
        return (
            <div className="upload-multi">
                <Carousel>
                    {displayFileList.length > 0 ? displayFileList.map((file) => {
                        return <div key={file.uid}>
                            <Header as='h4'>
                                <Header.Content>
                                    <span className={"underLine header-project"}>
                                        原型图
                                    </span>
                                </Header.Content>
                            </Header>
                            <div className="list-content">
                                <Image src={file.thumbUrl}/>
                                <div className="list-actions-content">
                                <span className="list-actions">
                                <a href="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                   target="_blank" rel="noopener noreferrer" title="预览文件">
                                    <Icon name="eye" className="list-action-icon"/>
                                </a>
                                    <Icon onClick={() => this.deleteFile(file)} name="trash"
                                          className={"list-action-icon pointer-cursor"}/>
                                </span>
                                </div>
                            </div>
                        </div>
                    }) : <div className="list-no-file">
                        没有文件...
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
            </div>
        );
    }
}

export default UploadMulti;