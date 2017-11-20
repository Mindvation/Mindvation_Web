import React, {Component} from 'react';
import {Slider, InputNumber} from 'antd';
import {Header, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

class MvSlider extends Component {
    state = {
        inputValue: this.props.value,
    };

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        if (value === this.state.inputValue) return;
        this.setState({
            inputValue: value,
        });
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    };

    getValue() {
        return this.state.inputValue;
    }

    render() {
        const {label, value, className = "", disabled} = this.props;
        return (
            <div className={"components-item item-horizontal align-right " + className}>
                {
                    label ? <div className='field-title'>
                        {/*{icon ? <Icon name={icon}/> : null}*/}
                        <FormattedMessage
                            id={label}
                        />
                    </div> : null
                }
                <div className="mv-slider-container input-content display-flex">
                    <div className="slider-container">
                        <Slider min={0} max={100} onChange={this.onChange} value={this.state.inputValue}
                                defaultValue={value} disabled={disabled}/>
                    </div>
                    {disabled ? <span style={{paddingLeft: '10px'}}>{this.state.inputValue + '%'}</span> :
                        <InputNumber
                            min={0}
                            max={100}
                            style={{marginLeft: 16}}
                            value={this.state.inputValue}
                            onChange={this.onChange}
                            size="large"
                            defaultValue={value}
                        />}
                </div>
            </div>
        );
    }
}

MvSlider.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default MvSlider;