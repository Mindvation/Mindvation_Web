import React, {Component} from 'react';
import Simditor from 'simditor';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {isEmpty} from '../../util/CommUtil';

class MVSimditor extends Component {
    state = {selfChecked: false, isEmpty: false};

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
            if (this.state.isEmpty) {
                this.setState({
                    isEmpty: false
                })
            }
            this.editor.setValue(this.props.defaultValue)
        } else {
            if (!this.state.isEmpty) {
                this.setState({
                    isEmpty: true
                });
            }
        }


        this.editor.on("valuechanged", (event) => {
            let inputValue = event.target.getValue();
            if (isEmpty(inputValue)) {
                if (!this.state.isEmpty) {
                    this.setState({
                        isEmpty: true
                    })
                }
                if (!this.state.selfChecked) {
                    this.setState({
                        selfChecked: true
                    })
                }
            } else {
                if (this.state.isEmpty) {
                    this.setState({
                        isEmpty: false
                    })
                }
                if (!this.state.selfChecked) {
                    this.setState({
                        selfChecked: true
                    })
                }
            }
        });
    }

    getValue = () => {
        this.setState({selfChecked: true});
        return {
            error: this.state.isEmpty && this.props.required,
            componentValue: this.editor.getValue()
        }
    };

    render() {
        const {label, required, fullWidth} = this.props;
        return (
            <div className={fullWidth ? "full-width" : "components-item item-horizontal align-right"}>
                {
                    label ? <div className='field-title'>
                        <div className={required ? "input-label" : null}>
                            <FormattedMessage
                                id={label}
                            />
                        </div>
                    </div> : null
                }
                <div
                    className={(required && this.state.selfChecked && this.state.isEmpty ? "components-error " : "")
                    + (fullWidth ? "full-width" : "input-content")}>
                    <textarea ref="textArea"/>
                </div>
            </div>
        );
    }
}

MVSimditor.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default MVSimditor;
