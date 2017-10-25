import React, {Component} from 'react';
import {Header, Input, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

class MVInput extends Component {
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
        })
    };

    checkValue = (event, data) => {
        let inputValue = data.value;
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

    render() {
        let props = {
            ...this.props
        };
        const {
            label, icon, required, checked, placeHolder, defaultValue, type = "text",
            step = "0.1", style, fullWidth, action, horizontal, value
        } = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className={"components-item" + " " + (horizontal ? "item-horizontal components-length" : "")}
                 style={style}>
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
                <Input fluid
                       placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                       error={required && (checked || this.state.selfChecked) && this.state.isEmpty}
                       className={fullWidth ? "" : "components-length"}
                       onChange={(event, data) => this.checkValue(event, data)}
                       defaultValue={defaultValue} value={value}
                       type={type} step={step} action={action}
                />
            </div>
        );
    }
}

MVInput.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    step: PropTypes.string,
    style: PropTypes.object,
    fullWidth: PropTypes.bool,
    action: PropTypes.object,
    horizontal: PropTypes.bool,
    onChange: PropTypes.func
};

export default injectIntl(MVInput, {withRef: true});
