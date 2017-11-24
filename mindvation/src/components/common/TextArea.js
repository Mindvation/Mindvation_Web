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
    };

    getValue = () => {
        this.setState({
            selfChecked: true
        });
        return this.textAreaNode.ref.value;
    };

    render() {
        let props = {
            ...this.props
        };
        const {label, required, placeHolder, defaultValue} = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className="components-item item-horizontal align-right">
                <div className='field-title'>
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
                    className={required && this.state.selfChecked && this.state.isEmpty ? "components-error" : ""}
                    onChange={(event, data) => this.checkValue(event, data)}
                    defaultValue={defaultValue}
                    ref={node => this.textAreaNode = node}
                />
                </Form>
            </div>
        );
    }
}

MVTextArea.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string
};

export default injectIntl(MVTextArea, {withRef: true});
