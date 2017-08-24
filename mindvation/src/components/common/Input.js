import React, {Component} from 'react';
import {Header, Input, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {isEmpty} from '../../util/CommUtil';

class MVInput extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
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
                       placeholder={placeHolder}
                       error={required && (checked || this.state.selfChecked) && this.state.isEmpty}
                       className="components-length"
                       onChange={(event, data) => this.checkValue(event, data)}/>
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
