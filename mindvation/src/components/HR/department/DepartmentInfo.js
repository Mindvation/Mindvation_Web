import React, {Component} from 'react';
import {Icon, Modal, Divider, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import _ from 'lodash';
import {getTimeAndRandom} from '../../../util/CommUtil';

class DepartmentInfo extends Component {
    state = {
        position: this.props.info && this.props.info.position ?
            _.cloneDeep(this.props.info.position) :
            [{
                key: getTimeAndRandom(),
                name: ''
            }]
    };

    getInfo = () => {
        return {
            name: this.nameNode.getWrappedInstance().getValue(),
            position: this.state.position
        }
    };

    createLeaderPosition = () => {
        let tempLeaderPosition = this.state.leaderPosition;
        const level = tempLeaderPosition[tempLeaderPosition.length - 1].positionLevel;
        tempLeaderPosition.push({key: getTimeAndRandom(), name: '', positionLevel: level + 1});
        this.setState({
            leaderPosition: tempLeaderPosition
        })
    };

    createPosition = () => {
        let tempPosition = this.state.position;
        tempPosition.push({key: getTimeAndRandom(), name: ''});
        this.setState({
            position: tempPosition
        })
    };

    removeLeaderPosition = (position) => {
        let tempLeaderPosition = this.state.leaderPosition;
        tempLeaderPosition.splice(tempLeaderPosition.indexOf(position), 1);
        tempLeaderPosition.map((tempPosition) => {
            if (tempPosition.positionLevel > position.positionLevel) {
                tempPosition.positionLevel = tempPosition.positionLevel - 1;
            }
        });
        this.setState({
            leaderPosition: tempLeaderPosition
        })
    };

    removePosition = (position) => {
        let tempPosition = this.state.position;
        tempPosition.splice(tempPosition.indexOf(position), 1);
        this.setState({
            position: tempPosition
        })
    };

    render() {
        const {info = {}} = this.props;
        const {position} = this.state;
        return (
            <Modal.Content>
                <Input label="Department Name" horizontal={true} icon="home"
                       ref={node => this.nameNode = node}
                       defaultValue={info.name}
                />
                {/*{
                    leaderPosition.map((position, i) => {
                        return <div style={{display: 'flex'}}>
                            <Input key={i}
                                   label={"职位" + position.positionLevel}
                                   horizontal={true}
                                   icon="user"
                                   onChange={(value) => {
                                       position.name = value;
                                       this.setState({
                                           leaderPosition: leaderPosition
                                       })
                                   }}
                                   value={position.name}
                            />
                            {leaderPosition.length > 1 ? <Icon name="trash"
                                                               className={"remove-position-button pointer-cursor"}
                                                               onClick={() => this.removeLeaderPosition(position)}
                            /> : null}
                        </div>
                    })
                }
                <Divider/>
                <Button className="create-position-button" compact basic
                        onClick={() => this.createLeaderPosition()}>
                    <Icon name="plus circle"/>
                    <FormattedMessage
                        id='新建负责人职位'
                        defaultMessage='新建负责人职位'
                    />
                </Button>*/}
                <Divider/>
                {
                    position.map((item, i) => {
                        return <div key={i} style={{display: 'flex'}}>
                            <Input
                                label="Position Name"
                                horizontal={true}
                                icon="home"
                                onChange={(value) => {
                                    item.name = value;
                                    this.setState({
                                        position: position
                                    })
                                }}
                                value={item.name}
                            />
                            {position.length > 1 ? <Icon name="trash"
                                                         className={"remove-position-button pointer-cursor"}
                                                         onClick={() => this.removePosition(position)}
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
