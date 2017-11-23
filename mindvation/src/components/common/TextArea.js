import React, {Component} from 'react';
import {TextArea, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

class MVTextArea extends Component {
    state = {
        isEmpty: true,
        selfChecked: false,
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
        const {label, required, checked, placeHolder, defaultValue} = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className="components-item item-horizontal align-right">
                <div className='field-title'>
                    {/*{icon ? <Icon name={icon}/> : null}*/}
                    <div className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </div>
                </div>
                <Form className="input-content">
                <TextArea
                    autoHeight style={{minHeight: 100}}
                    placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                    className={(required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : "")}
                    onChange={(event, data) => this.checkValue(event, data)}
                    defaultValue={defaultValue}
                />
                </Form>
            </div>
        );
    }
}

MVTextArea.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string
};

export default injectIntl(MVTextArea, {withRef: true});
