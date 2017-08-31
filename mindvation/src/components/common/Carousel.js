import React, {Component} from 'react';
import {Segment, Icon} from 'semantic-ui-react';
import {Button} from 'antd';
import $ from 'jquery';

class Carousel extends Component {

    state = {upDisabled: true, downDisabled: true};

    componentDidMount() {
        this.checkScrollable();
    };

    checkScrollable = () => {
        let targetElm = this.refs.myCarousel.firstElementChild;
        if (targetElm.scrollTop === 0) {
            this.setState({
                upDisabled: true
            })
        } else {
            this.setState({
                upDisabled: false
            })
        }

        if (targetElm.scrollTop === targetElm.scrollHeight - targetElm.clientHeight) {
            this.setState({
                downDisabled: true
            })
        }
        else {
            this.setState({
                downDisabled: false
            })
        }
    };

    down = () => {
        let targetElm = this.refs.myCarousel.firstElementChild;
        let tempScrollTop = targetElm.scrollTop + targetElm.clientHeight / 2;
        if (tempScrollTop - (targetElm.scrollHeight - targetElm.clientHeight) < 0 &&
            tempScrollTop - (targetElm.scrollHeight - targetElm.clientHeight) > -5) {
            tempScrollTop = targetElm.scrollHeight - targetElm.clientHeight;
        }
        $(targetElm).animate({scrollTop: tempScrollTop}, 400, this.checkScrollable);
        return false;
    };

    up = () => {
        let targetElm = this.refs.myCarousel.firstElementChild;
        let tempScrollTop = targetElm.scrollTop - targetElm.clientHeight / 2;
        tempScrollTop < 5 ? tempScrollTop = 0 : tempScrollTop;
        $(targetElm).animate({scrollTop: tempScrollTop}, 400, this.checkScrollable);
        return false;
    };

    render() {
        return (
            <Segment className="carousel-segment-outer">
                <Button className={"carousel-button carousel-button-up"}
                        onClick={this.up} disabled={this.state.upDisabled}>
                    <Icon name="chevron up"/>
                </Button>
                {
                    React.Children.map(this.props.children, function (child) {
                        return <div ref="myCarousel">{child}</div>;
                    })
                }
                <Button className={"carousel-button carousel-button-down"}
                        onClick={this.down} disabled={this.state.downDisabled}>
                    <Icon name="chevron down"/>
                </Button>
            </Segment>
        );
    }
}


export default Carousel;
