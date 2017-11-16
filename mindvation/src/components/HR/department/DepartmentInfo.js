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
                <Divider/>
                {
                    positions.map((item, i) => {
                        return <div key={i} style={{display: 'flex'}}>
                            <Input
                                label="Position Name"
                                onChange={(value) => {
                                    item.name = value;
                                    this.setState({
                                        positions: positions
                                    })
                                }}
                                value={item.name}
                                style={{flex: 1}}
                            />
                            {positions.length > 1 ? <Icon name="trash"
                                                          className={"remove-position-button pointer-cursor"}
                                                          onClick={() => this.removePosition(item)}
                            /> : null}
                        </div>
                    })
                }
                <Divider/>
                <Button className="create-position-button" compact basic
                        onClick={() => this.createPosition()}>
                    <Icon name="plus circle"/>
                    <FormattedMessage
                        id='createPosition'
                        defaultMessage='Create Position'
                    />
                </Button>
            </Modal.Content>
        );
    }
}

export default DepartmentInfo;
