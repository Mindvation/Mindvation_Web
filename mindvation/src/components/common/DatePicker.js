import React, {Component} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

let inputValue;
const RangePicker = DatePicker.RangePicker;

class MVDatePicker extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    dateChange = (event, data) => {
        inputValue = data;
        if (inputValue[0] === null || inputValue[0] === undefined || inputValue[0] === ""
            || inputValue[1] === null || inputValue[1] === undefined || inputValue[1] === "") {
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
    };

    getValue = () => {
        return inputValue;
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    };

    render() {
        const {label, icon, required, checked, placeHolder, range} = this.props;

        return (
            <div className="components-item">
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        {label}
                    </Header.Content>
                </Header>
                {
                    range ? <RangePicker
                        ranges={{Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')]}}
                        onChange={this.dateChange}
                        className={required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : ""}
                        ref={node => {
                            inputValue = node
                        }}
                        placeholder={placeHolder}
                        //disabledDate={this.disabledDate}
                    /> : <DatePicker
                        className={required && (checked || this.state.selfChecked) && this.state.isEmpty ? "components-error" : ""}
                        onChange={this.dateChange}
                        ref={node => {
                            inputValue = node
                        }}
                        placeholder={placeHolder}/>
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
