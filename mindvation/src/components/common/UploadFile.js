import React, {Component} from 'react';
import {Upload} from 'antd';
import {Header, Icon, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {url} from '../../util/ServiceUrl';
import Message from './Message';
import {getStaffId} from '../../util/UserStore';

class UploadFile extends Component {
    state = {
        fileList: this.props.defaultFileList || []
    };

    handleChange = ({file, fileList}) => {
        console.info(file.status);
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

    render() {
        const {label, icon, required} = this.props;
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
            onChange: this.handleChange
        };
        return (
            <div className="components-item">
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </Header.Content>
                </Header>
                {/*<input id="file" type="file" name="name"/>
                <button onClick={this.testUpload}>Upload</button>*/}
                <Upload {...props}
                        fileList={fileList}
                >
                    <Button basic>
                        <Icon name="upload"/>
                        <FormattedMessage
                            id='selectFile'
                            defaultMessage='Select File'
                        />
                    </Button>
                </Upload>
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