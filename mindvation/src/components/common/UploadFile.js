import React, {Component} from 'react';
import {Upload} from 'antd';
import {Header, Icon, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {url} from '../../util/ServiceUrl';

class UploadFile extends Component {
    state = {
        fileList: [],
        uploading: false,
    };

    render() {
        const {label, icon, required} = this.props;

        const props = {
            name: 'mFile',
            action: url.uploadFile,
            headers: {
                authorization: 'authorization-text',
                'Access-Control-Allow-Origin': '*',
                'Access-Token': sessionStorage.getItem('access_token') || ''
            },
            data: {
                "subjectId": "P1",
                "creatorId": "m2"
            }
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
                <Upload {...props}>
                    <Button basic>
                        <Icon name="upload"/>
                        <FormattedMessage
                            id='selectFile'
                            defaultMessage='Select File'
                        />
                    </Button>
                </Upload>
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