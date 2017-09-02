import React, {Component} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {DatePicker} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

const RangePicker = DatePicker.RangePicker;

class MVDatePicker extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    componentDidMount() {
        this.checkDefaultValue();
    };

    dateChange = (event, data) => {
        let inputValue = data;
        const {range} = this.props;
        if ((range && (isEmpty(inputValue[0]) || isEmpty(inputValue[1])))
            || (!range && isEmpty(inputValue))
        ) {
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

    getValue = () => {
        return this.state.returnValue;
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    };

    render() {
        const {label, icon, required, checked, range, defaultValue} = this.props;
        const dateFormat = 'YYYY/MM/DD';
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
                {
                    range ? <RangePicker
                        onChange={this.dateChange}
                        className={required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : ""}
                        defaultValue={(defaultValue && defaultValue[0] && defaultValue[1]) ? [moment(defaultValue[0], dateFormat), moment(defaultValue[1], dateFormat)] : null}
                    /> : <DatePicker
                        className={required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : ""}
                        onChange={this.dateChange}
                        defaultValue={defaultValue ? moment(defaultValue, dateFormat) : null}/>
                }
            </div>
        );
    }
}

MVDatePicker.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    range: PropTypes.bool
};

export default MVDatePicker;
