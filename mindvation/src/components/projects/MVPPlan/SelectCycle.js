import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import {FormattedMessage} from 'react-intl';
import {iterationCycleOptions} from '../../../res/data/dataOptions';

class SelectCycle extends Component {
    state = {checked: false};

    getInfo = () => {
        this.setState({
            checked: true
        });
        return {iterationCycle: this.iterationCycleNode.getWrappedInstance().getValue()};
    };

    render() {

        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        <FormattedMessage
                            id='chooseIterationCycle'
                            defaultMessage='Choose Iteration Cycle'
                        />
                    </Header>
                </Modal.Description>
                <Select icon="recycle"
                        checked={this.state.checked}
                        horizontal={true}
                        required={true}
                        options={iterationCycleOptions} label="Iteration Cycle"
                        ref={node => {
                            this.iterationCycleNode = node
                        }}
                />
            </Modal.Content>
        );
    }
}

export default SelectCycle;