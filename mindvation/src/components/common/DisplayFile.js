import React, {Component} from 'react';
import {List} from 'semantic-ui-react';

class DisplayFile extends Component {

    render() {
        const {fileList} = this.props;

        return (
            <div>
                <List horizontal>
                    {fileList.map((file, i) => {
                        return <List.Item key={i}>
                            <div className="file-item">
                                <div className="file-name">
                                    <a href={file.url}
                                       target="_blank" rel="noopener noreferrer">{file.name}</a>
                                </div>
                            </div>
                        </List.Item>
                    })}
                </List>
            </div>
        );
    }
}

export default DisplayFile;