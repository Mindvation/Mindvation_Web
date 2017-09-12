import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEmpty, getDesc} from '../../util/CommUtil';

class Display extends Component {

    displayValue = (value, options) => {
        if (isEmpty(value)) {
            return "";
        } else {
            if (options) {
                let desc = getDesc(options, value);
                return desc;
            }
        }

        return value;
    };

    render() {
        const {value, options, textStyle} = this.props;
        return (
            <span style={textStyle}>
                {this.displayValue(value, options)}
            </span>
        );
    }
}

Display.propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    textStyle: PropTypes.object
};

export default Display;
