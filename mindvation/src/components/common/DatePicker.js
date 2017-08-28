import React, {Component} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

const RangePicker = DatePicker.RangePicker;

class MVDatePicker extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
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

    getValue = () => {
        return this.state.returnValue;
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    };

    render() {
        const {label, icon, required, checked, range} = this.props;
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
                        //disabledDate={this.disabledDate}
                    /> : <DatePicker
                        className={required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : ""}
                        onChange={this.dateChange}/>
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
