import React, {Component} from 'react';
import {Header, TextArea, Icon, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';

let inputValue;

class MVTextArea extends Component {
    state = {
        isEmpty: true,
        selfChecked: false
    };

    checkValue = () => {
        const value = inputValue.ref.value;
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
        return inputValue.ref.value;
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
                <Form>
                <TextArea
                    autoHeight style={{minHeight: 100}}
                    ref={node => {
                        inputValue = node
                    }}
                    placeholder={placeHolder}
                    className={"components-length" + " " + (required && (checked || this.state.selfChecked) && this.state.isEmpty ? "error" : "")}
                    onChange={this.checkValue}/>
                </Form>
            </div>
        );
    }
}

MVTextArea.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string
};

export default MVTextArea;
