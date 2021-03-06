import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

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
            props.action && props.action(item.data, dropResult)
        }
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
});

class AcceptBox extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        action: PropTypes.func,
        type: PropTypes.string,
        style: PropTypes.object
    };

    render() {
        const {isDragging, connectDragSource, style} = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return (
            connectDragSource(
                <div style={{...style, opacity}} className={isDragging ? "drag-box-dragging" : ""}>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return <div>{child}</div>;
                        })
                    }
                </div>
            )
        );
    }
}

export default DragSource(props => props.type, boxSource, collect)(AcceptBox);