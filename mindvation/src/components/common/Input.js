import React, {Component} from 'react';
import {Header, Input, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

class MVInput extends Component {
    state = {
        isEmpty: true,
        selfChecked: false,
        isInvalid: false,
        errorMsg: ''
    };

    componentDidMount() {
        this.checkDefaultValue();
    };

    getWrappedInstance = () => {
        if (this.props.widthRef) {
            return this.wrappedInstance;
        }
    };

    setWrappedInstance = (ref) => {
        this.wrappedInstance = ref;
    };

    checkDefaultValue = () => {
        const {defaultValue} = this.props;
        if (isEmpty(defaultValue)) {
            if (!this.state.isEmpty) {
                this.setState({
                    isEmpty: true
                });
            }

        } else {
            if (this.state.isEmpty) {
                this.setState({
                    isEmpty: false
                })
            }
        }
    };

    checkValue = (event, data) => {
        let inputValue = data.value;
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

        if (this.props.onChange) {
            this.props.onChange(inputValue)
        }
    };

    checkRegular = () => {
        const {regular} = this.props;
        if (this.state.isEmpty || !regular || !regular.regularEx) return;
        let flag = false, errorMsg = '';
        if (!regular.regularEx.test(this.inputNode.inputRef.value)) {
            flag = true;
            errorMsg = regular.message || <FormattedMessage
                id='invalidInput'
                defaultMessage='Invalid Input'
            />
        }
        this.setState({
            isInvalid: flag,
            errorMsg: errorMsg
        })
    };

    getValue = () => {
        this.setState({
            selfChecked: true
        });
        return {
            error: this.state.isInvalid || (this.state.isEmpty && this.props.required),
            componentValue: this.inputNode.inputRef.value
        }
    };

    render() {
        let props = {
            ...this.props
        };
        const {
            label, required, placeHolder, defaultValue, type = "text",
            step = "0.1", style, fullWidth, action, value, readOnly
        } = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className={fullWidth ? "full-width" : "components-item item-horizontal align-right"}
                 style={style}>
                {
                    label ? <div className="field-title">
                        <div className={required ? "input-label" : null}>
                            <FormattedMessage
                                id={label}
                            />
                        </div>
                    </div> : null
                }
                <Input
                    disabled={readOnly}
                    placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                    error={(required && this.state.selfChecked && this.state.isEmpty) || this.state.isInvalid}
                    className={fullWidth ? "full-width" : "input-content"}
                    onChange={(event, data) => this.checkValue(event, data)}
                    defaultValue={defaultValue} value={value}
                    type={type}
                    step={type === "number" ? step : ''} action={action}
                    ref={node => this.inputNode = node}
                    onBlur={() => this.checkRegular()}
                />
                {this.state.isInvalid ? <div className="components-error-message">{
                    this.state.errorMsg
                }</div> : null}
            </div>
        );
    }
}

MVInput.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    step: PropTypes.string,
    style: PropTypes.object,
    fullWidth: PropTypes.bool,
    action: PropTypes.object,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    regular: PropTypes.object
};

export default injectIntl(MVInput, {withRef: true});
