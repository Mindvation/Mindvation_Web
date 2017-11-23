import React, {Component} from 'react';
import Simditor from 'simditor';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {isEmpty} from '../../util/CommUtil';

class MVSimditor extends Component {
    state = {value: ''};

    componentDidMount() {
        this.editor = new Simditor({
            textarea: this.refs.textArea,
            toolbar:
                [
                    'title',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'fontScale',
                    'color',
                    'ol',
                    'ul',
                    'blockquote',
                    'code',
                    'table',
                    'link',
                    'hr',
                    'indent',
                    'outdent',
                    'alignment'
                ]
        });

        if (!isEmpty(this.props.defaultValue)) {
            this.editor.setValue(this.props.defaultValue)
        }
    }

    getValue = () => {
        return this.editor.getValue();
    };

    render() {
        const {label, required} = this.props;
        return (
            <div className="components-item item-horizontal align-right">
                {
                    label ? <div className='field-title'>
                        <div className={required ? "input-label" : null}>
                            <FormattedMessage
                                id={label}
                            />
                        </div>
                    </div> : null
                }
                <textarea ref="textArea"/>
            </div>
        );
    }
}

MVSimditor.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string
};

export default MVSimditor;
