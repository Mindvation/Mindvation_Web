import React, {Component} from 'react';
import {Header, Dropdown, Icon} from 'semantic-ui-react';
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
            this.setState({
                isEmpty: true
            })
        } else {
            this.setState({
                isEmpty: false
            })
        }

        this.setState({
            returnValue: defaultValue
        });

        /*if (this.props.onChange) {
            this.props.onChange(defaultValue)
        }*/
    };

    checkValue = (event, data) => {
        let inputValue = data.value;

        if (this.state.returnValue === inputValue) return;

        if (isEmpty(inputValue)) {
            this.setState({
                isEmpty: true,
                selfChecked: true
            })
        } else {
            this.setState({
                isEmpty: false,
                selfChecked: true
            })
        }

        this.setState({
            returnValue: inputValue
        });

        if (this.props.onChange) {
            this.props.onChange(inputValue)
        }
    };

    getValue = () => {
        return this.state.returnValue;
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
        return returnOption;
    };

    render() {
        let props = {
            ...this.props
        };
        const {
            label, options, icon, required, checked, search, subSelect, addOther,
            multiple, placeHolder, horizontal, defaultValue, disabled
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
            <div className={"components-item" + " " + (horizontal ? "item-horizontal components-length" : "")}
                 style={subSelect ? {width: '100%'} : {}}
            >
                {
                    label ? <Header as='h4'>
                        {icon ? <Icon name={icon}/> : null}
                        <Header.Content className={required ? "input-label" : null}>
                            <FormattedMessage
                                id={label}
                            />
                        </Header.Content>
                    </Header> : null
                }
                <Dropdown placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                          search={search}
                          multiple={multiple}
                          selection
                          options={selectOptions}
                          className={(subSelect ? "full-width" : "components-length") + " " + (required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : "")}
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
    icon: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    search: PropTypes.bool,
    multiple: PropTypes.bool,
    horizontal: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    subSelect: PropTypes.bool
};

export default injectIntl(MVSelect, {withRef: true});
