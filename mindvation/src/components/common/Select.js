import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty, getOption} from '../../util/CommUtil';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';
import _ from 'lodash';

class MVSelect extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
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

        this.setState({
            returnValue: defaultValue
        });
    };

    checkValue = (event, data) => {
        let inputValue = data.value;

        if (this.state.returnValue === inputValue) return;

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

        this.setState({
            returnValue: inputValue
        });

        if (this.props.onChange) {
            this.props.onChange(inputValue)
        }
    };

    getValue = () => {
        this.setState({
            selfChecked: true
        });
        return {
            error: this.state.isEmpty && this.props.required,
            componentValue: this.state.returnValue
        }
    };

    getFullValue = () => {
        const {options, multiple} = this.props;
        let returnOption = [];
        if (multiple) {
            this.state.returnValue.map((value) => {
                returnOption.push(getOption(options, value))
            })
        } else {
            returnOption = getOption(options, this.state.returnValue);
        }
        return {
            error: this.state.isEmpty && this.props.required,
            componentValue: returnOption
        }
    };

    render() {
        let props = {
            ...this.props
        };
        const {
            label, options, required, search, fullWidth, addOther,
            multiple, placeHolder, defaultValue, disabled
        } = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }

        let selectOptions = _.cloneDeep(options);


        if (addOther && selectOptions.length > 0) {
            selectOptions.push({
                text: <FormattedMessage
                    id='other'
                    defaultMessage='Other'
                />,
                value: 'other'
            });
        }

        if (selectOptions.length > 0) {
            if (!multiple) {
                selectOptions.unshift(
                    {
                        text: <FormattedMessage
                            id='selectHolder'
                            defaultMessage='Please Select'
                        />,
                        value: ''
                    })
            }
        } else {
            selectOptions = [{
                text: <FormattedMessage
                    id='noOptions'
                    defaultMessage='No Options'
                />,
                value: ''
            }];
        }


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
                <Dropdown placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                          search={search}
                          multiple={multiple}
                          selection
                          options={selectOptions}
                          className={fullWidth ? "full-width" : "input-content" + " " + (required && this.state.selfChecked && this.state.isEmpty ? "components-error" : "")}
                          onChange={(event, data) => {
                              this.checkValue(event, data)
                          }}
                          defaultValue={defaultValue}
                          disabled={disabled}
                />
            </div>
        );
    }
}

MVSelect.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    placeHolder: PropTypes.string,
    search: PropTypes.bool,
    multiple: PropTypes.bool,
    horizontal: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    subSelect: PropTypes.bool,
    fullWidth: PropTypes.bool
};

export default injectIntl(MVSelect, {withRef: true});
