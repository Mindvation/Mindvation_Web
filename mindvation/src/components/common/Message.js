import React, {Component} from 'react';
import {message} from 'antd';
import {injectIntl} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

class Message extends Component {

    getWrappedInstance = () => {
        if (this.props.widthRef) {
            return this.wrappedInstance;
        }
    };

    setWrappedInstance = (ref) => {
        this.wrappedInstance = ref;
    };

    success(messageKey) {
        const {formatMessage} = this.props.intl;
        message.success(formatMessage(messages[messageKey]), 5)
    }

    error(messageKey) {
        const {formatMessage} = this.props.intl;
        message.error(formatMessage(messages[messageKey]), 5)
    }

    render() {
        let props = {
            ...this.props
        };
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return false;
    }
}

export default injectIntl(Message, {withRef: true});