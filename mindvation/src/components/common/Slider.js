import React, {Component} from 'react';
import {Slider, InputNumber} from 'antd';
import {Header, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

class MvSlider extends Component {
    state = {
        inputValue: this.props.value,
    };

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    };

    getValue() {
        return this.state.inputValue;
    }

    render() {
        const {label, icon, value} = this.props;
        return (
            <div className="components-item">
                {
                    label ? <Header as='h4'>
                        {icon ? <Icon name={icon}/> : null}
                        <Header.Content>
                            <FormattedMessage
                                id={label}
                            />
                        </Header.Content>
                    </Header> : null
                }
                <div className={"components-length mv-slider-container"}>
                    <div className="slider-container">
                        <Slider min={1} max={100} onChange={this.onChange} value={this.state.inputValue}
                                defaultValue={value}/>
                    </div>
                    <InputNumber
                        min={0}
                        max={100}
                        style={{marginLeft: 16}}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                        size="large"
                        defaultValue={value}
                    />
                </div>
            </div>
        );
    }
}

MvSlider.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    icon: PropTypes.string
};

export default MvSlider;