import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
    color: '#000000'
};

const boxSource = {
    beginDrag(props) {
        return {
            data: props.data,
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            /*window.alert( // eslint-disable-line no-alert
                `You dropped ${item.data.projectId} into ${dropResult.name}!`,
            );*/
            props.action && props.action(item.data, dropResult)
        }
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
});

class DragBox extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
        const {isDragging, connectDragSource} = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return (
            connectDragSource(
                <div style={{...style, opacity}}>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return <div>{child}</div>;
                        })
                    }
                </div>,
            )
        );
    }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);