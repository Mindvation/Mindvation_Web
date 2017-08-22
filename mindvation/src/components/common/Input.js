import React, {Component} from 'react';
import {Header, Input, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

let inputValue;

class MVInput extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    checkValue = () => {
        const value = inputValue.inputRef.value;
        if (value === null || value === undefined || value === "") {
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
        return inputValue.inputRef.value;
    };

    render() {
        const {label, icon, required, checked, placeHolder} = this.props;
        return (
            <div className="components-item">
                <Header as='h4'>
                    {icon ? <Icon name={icon}/> : null}
                    <Header.Content className={required ? "input-label" : null}>
                        {label}
                    </Header.Content>
                </Header>
                <Input fluid
                       ref={node => {
                           inputValue = node
                       }}
                       placeholder={placeHolder}
                       error={required && (checked || this.state.selfChecked) && this.state.isEmpty}
                       className="components-length"
                       onChange={this.checkValue}/>
            </div>
        );
    }
}

MVInput.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string
};

export default MVInput;