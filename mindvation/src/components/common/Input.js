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
        })
    };

    getValue = () => {
        return this.state.returnValue;
    };

    render() {
        let props = {
            ...this.props
        };
        const {label, icon, required, checked, placeHolder, defaultValue} = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className="components-item">
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </Header.Content>
                </Header>
                <Input fluid
                       placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                       error={required && (checked || this.state.selfChecked) && this.state.isEmpty}
                       className="components-length"
                       onChange={(event, data) => this.checkValue(event, data)}
                       defaultValue={defaultValue}
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
    defaultValue: PropTypes.string
};

export default injectIntl(MVInput, {withRef: true});
