import React, {Component} from 'react';
import {Header, Dropdown, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

class MVSelect extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    getWrappedInstance = () => {
        if (this.props.widthRef) {
            return this.wrappedInstance;
        }
    };

    setWrappedInstance = (ref) => {
        this.wrappedInstance = ref;
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
        const {label, options, icon, required, checked, search, multiple, placeHolder, horizontal} = this.props;
        const {formatMessage} = this.props.intl;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div className={"components-item" + " " + (horizontal ? "item-horizontal components-length" : "")}>
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </Header.Content>
                </Header>
                <Dropdown placeholder={messages[placeHolder] ? formatMessage(messages[placeHolder]) : placeHolder}
                          search={search}
                          multiple={multiple}
                          selection
                          options={options}
                          className={"components-length" + " " + (required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : "")}
                          onChange={(event, data) => {
                              this.checkValue(event, data)
                          }}
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
    horizontal: PropTypes.bool
};

export default injectIntl(MVSelect, {withRef: true});
