import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import {FormattedMessage} from 'react-intl';

const dummyOptions = [
    {
        text: 'Sprint 3',
        value: '3'
    },
    {
        text: 'Sprint 4',
        value: '4'
    },
];

class CompleteSprint extends Component {
    getInfo = () => {
        return {
            moveToSprint: this.moveToNode.getWrappedInstance().getValue()
        };
    };

    render() {
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        Complete Sprint: Sample Sprint2
                    </Header>
                </Modal.Description>
                <div className="components-item">
                    <div>3 issues were done</div>
                    <div>2 issues were incomplete</div>
                    <div style={{marginTop: '1em'}}>Select where all incomplete issues should be moved:</div>
                    <Select
                        horizontal={true}
                        options={dummyOptions} label="Move To"
                        ref={node => {
                            this.moveToNode = node
                        }}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default CompleteSprint;
