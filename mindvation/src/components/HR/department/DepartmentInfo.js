import React, {Component} from 'react';
import {Icon, Modal, Divider, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import _ from 'lodash';
import {getTimeAndRandom} from '../../../util/CommUtil';

class DepartmentInfo extends Component {
    state = {
        positions: this.props.info && this.props.info.positions ?
            _.cloneDeep(this.props.info.positions) :
            [{
                key: getTimeAndRandom(),
                name: ''
            }]
    };

    getInfo = () => {
        return {
            name: this.nameNode.getWrappedInstance().getValue(),
            positions: this.state.positions
        }
    };

    createPosition = () => {
        let tempPositions = this.state.positions;
        tempPositions.push({key: getTimeAndRandom(), name: ''});
        this.setState({
            positions: tempPositions
        })
    };

    removePosition = (position) => {
        let tempPositions = this.state.positions;
        tempPositions.splice(tempPositions.indexOf(position), 1);
        this.setState({
            positions: tempPositions
        })
    };

    render() {
        const {info = {}} = this.props;
        const {positions} = this.state;
        return (
            <Modal.Content>
                <Input label="Department Name"
                       ref={node => this.nameNode = node}
                       defaultValue={info.name}
                />
                <div className="components-item item-horizontal align-right">
                    <div className="field-title">
                        <FormattedMessage
                            id='Position'
                            defaultMessage='Position'
                        />
                    </div>
                    <div className="input-content">
                        <Button className="confirm-button "
                                onClick={() => this.createPosition()}>
                            <FormattedMessage
                                id='createPosition'
                                defaultMessage='Create Position'
                            />
                        </Button>
                    </div>
                </div>
                {
                    positions.map((item, i) => {
                        return <div key={i} className="components-item item-horizontal align-right">
                            <div className="input-content add-department-content">
                                <Input
                                    onChange={(value) => {
                                        item.name = value;
                                        this.setState({
                                            positions: positions
                                        })
                                    }}
                                    value={item.name}
                                    fullWidth={true}
                                />
                                {positions.length > 1 ?
                                    <Button className="delete-button"
                                            onClick={() => this.removePosition(item)}>
                                        <FormattedMessage
                                            id='delete'
                                            defaultMessage='Delete'
                                        />
                                    </Button>
                                    : null}
                            </div>
                        </div>
                    })
                }

            </Modal.Content>
        );
    }
}

export default DepartmentInfo;
