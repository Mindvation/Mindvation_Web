import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
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