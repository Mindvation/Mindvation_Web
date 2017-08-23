import React, {Component} from 'react';
import {Header, Dropdown, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

let inputValue;

class MVSelect extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    checkValue = (event, data) => {
        inputValue = data.value;
        if (inputValue === null || inputValue === undefined || inputValue === "") {
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

    render() {
        const {label, options, icon, required, checked, search, multiple, placeHolder, horizontal} = this.props;

        return (
            <div className={"components-item" + " " + (horizontal ? "item-horizontal" : "")}>
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        {label}
                    </Header.Content>
                </Header>
                <Dropdown placeholder={placeHolder} fluid search={search} multiple={multiple} selection
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

export default MVSelect;
