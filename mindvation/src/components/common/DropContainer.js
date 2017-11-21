import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import ItemTypes from './ItemTypes';

let data;

const boxTarget = {
    drop() {
        return {name: data};
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
});

class DropContainer extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        style: PropTypes.object
    };

    render() {
        const {canDrop, isOver, connectDropTarget, style} = this.props;
        const isActive = canDrop && isOver;
        data = this.props.data;
        let backgroundColor = '#f8f8f8';
        if (isActive) {
            backgroundColor = '#f8f8f8';
        } else if (canDrop) {
            backgroundColor = '#e8e8e8';
        }

        return connectDropTarget(
            <div style={{...style, backgroundColor}} className="drop-container">
                {/*{isActive ?
                    'Release to drop' :
                    'Drag a box here'
                }*/}
                <div style={{overflow: 'hidden', clear: 'both'}}>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return <div>{child}</div>;
                        })
                    }
                </div>
            </div>,
        );
    }
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(DropContainer);