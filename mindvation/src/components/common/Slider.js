import React, {Component} from 'react';
import {Slider, InputNumber} from 'antd';

class MvSlider extends Component {
    state = {
        inputValue: 5,
    };

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    };

    render() {
        return (
            <div className={"mv-slider-container components-length"}>
                <div className="slider-container">
                    <Slider min={1} max={100} onChange={this.onChange} value={this.state.inputValue}/>
                </div>
                <InputNumber
                    min={0}
                    max={100}
                    style={{marginLeft: 16}}
                    value={this.state.inputValue}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default MvSlider;