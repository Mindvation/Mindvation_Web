import React, {Component} from 'react';
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
        })
    };

    checkDefaultValue = () => {
        const {defaultValue} = this.props;
        const {range} = this.props;
        if (isEmpty(defaultValue) ||
            (range && (isEmpty(defaultValue[0]) || isEmpty(defaultValue[1])))) {
            if (!this.state.isEmpty) {
                this.setState({
                    isEmpty: true
                })
            }
        } else {
            if (this.state.isEmpty) {
                this.setState({
                    isEmpty: false
                })
            }
        }

        if (range) {
            this.setState({
                returnValue: defaultValue || []
            });
            return;
        }

        this.setState({
            returnValue: defaultValue
        })
    };

    getValue = () => {
        this.setState({
            selfChecked: true
        });
        if (this.props.range) {
            return [{
                error: this.state.isEmpty && this.props.required,
                componentValue: this.state.returnValue[0]
            }, {
                error: this.state.isEmpty && this.props.required,
                componentValue: this.state.returnValue[1]
            }]
        } else {
            return {
                error: this.state.isEmpty && this.props.required,
                componentValue: this.state.returnValue
            }
        }

    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    };

    render() {
        const {label, required, range, defaultValue} = this.props;
        const dateFormat = 'YYYY/MM/DD';
        return (
            <div className="components-item item-horizontal align-right">
                <div className='field-title'>
                    <div className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </div>
                </div>
                <div className="input-content">
                    {
                        range ? <RangePicker
                            onChange={this.dateChange}
                            className={required && this.state.selfChecked && this.state.isEmpty ? "components-error" : ""}
                            defaultValue={(defaultValue && defaultValue[0] && defaultValue[1]) ? [moment(defaultValue[0], dateFormat), moment(defaultValue[1], dateFormat)] : null}
                        /> : <DatePicker
                            className={required && this.state.selfChecked && this.state.isEmpty ? "components-error" : ""}
                            onChange={this.dateChange}
                            defaultValue={defaultValue ? moment(defaultValue, dateFormat) : null}/>
                    }
                </div>
            </div>
        );
    }
}

MVDatePicker.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    range: PropTypes.bool
};

export default MVDatePicker;
