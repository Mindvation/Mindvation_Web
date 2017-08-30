import React, {Component} from 'react';
import {Upload} from 'antd';
import {Header, Icon, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

class DisplayFile extends Component {

    render() {
        const {fileList} = this.props;
        const props = {
            defaultFileList: [...fileList]
        };
        return (
            <div style={{marginTop: '-10px'}}>
                <Upload {...props} className="display-file"/>
            </div>
        );
    }
}

export default DisplayFile;