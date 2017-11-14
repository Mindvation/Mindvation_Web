import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class MVImage extends Component {

    render() {

        const {name, style, type} = this.props;

        return (
            <Image className="mv-image" style={style}
                   src={require('../../res/image/UI/' + name + '.' + (type || 'png'))}/>
        );
    }
}

MVImage.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string
};

export default MVImage;
