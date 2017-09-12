import React, {Component} from 'react';
import {Upload} from 'antd';

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