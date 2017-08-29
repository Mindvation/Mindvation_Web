import React, {Component} from 'react';
import {Upload} from 'antd';
import {Header, Icon, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

class UploadFile extends Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });
    };

    render() {
        const {uploading} = this.state;
        const {label, icon, required} = this.props;

        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            multiple: true
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
                <Upload {...props}>
                    <Button basic>
                        <Icon name="upload"/>
                        <FormattedMessage
                            id='selectFile'
                            defaultMessage='Select File'
                        />
                    </Button>
                </Upload>
                <Button
                    primary
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={uploading}
                    style={{marginTop: '15px'}}
                >
                    <FormattedMessage
                        id='startUpload'
                        defaultMessage='Start Upload'
                    />
                </Button>
            </div>
        );
    }
}

UploadFile.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool
};

export default UploadFile;