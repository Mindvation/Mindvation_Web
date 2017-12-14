import React, {Component} from 'react';
import {Badge} from 'antd';
import MVImage from './Image';
import {Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';

class Information extends Component {
    state = {
        showInfo: false
    };

    checkMoreInfo = () => {

    };

    toggleInfo = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    };

    render() {
        const {showInfo} = this.state;
        return (
            <div className={(showInfo ? "active-info " : "") + "info-content"}>
                <div onClick={() => this.toggleInfo()} className="info-badge">
                    <Badge count={108} showZero>
                        <MVImage name="notify"/>
                    </Badge>
                </div>
                <div className={"info-down-content"}>
                    <div className="info-top">
                        <div className="information-content">
                            <div className="notify-left">
                                <Image verticalAlign="top"
                                       className="notify-avatar"
                                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                       avatar/>
                                <div className="notify-message-content">
                                    <div className="information-name">Bob</div>
                                    <div className="information-message">aaa</div>
                                </div>
                            </div>
                            <div className="notify-right">
                                <div className="information-button information-close-button">
                                    <FormattedMessage
                                        id='close'
                                        defaultMessage='Close'
                                    />
                                </div>
                                <div className="information-button information-check-button">
                                    <FormattedMessage
                                        id='check'
                                        defaultMessage='Check'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="information-content">
                            <div className="notify-left">
                                <Image verticalAlign="top"
                                       className="notify-avatar"
                                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                       avatar/>
                                <div className="notify-message-content">
                                    <div className="information-name">Bob</div>
                                    <div className="information-message">aaa</div>
                                </div>
                            </div>
                            <div className="notify-right">
                                <div className="information-button information-close-button">
                                    <FormattedMessage
                                        id='close'
                                        defaultMessage='Close'
                                    />
                                </div>
                                <div className="information-button information-check-button">
                                    <FormattedMessage
                                        id='check'
                                        defaultMessage='Check'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="information-content">
                            <div className="notify-left">
                                <Image verticalAlign="top"
                                       className="notify-avatar"
                                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                       avatar/>
                                <div className="notify-message-content">
                                    <div className="information-name">Bob</div>
                                    <div className="information-message">aaa</div>
                                </div>
                            </div>
                            <div className="notify-right">
                                <div className="information-button information-close-button">
                                    <FormattedMessage
                                        id='close'
                                        defaultMessage='Close'
                                    />
                                </div>
                                <div className="information-button information-check-button">
                                    <FormattedMessage
                                        id='check'
                                        defaultMessage='Check'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="information-content">
                            <div className="notify-left">
                                <Image verticalAlign="top"
                                       className="notify-avatar"
                                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                       avatar/>
                                <div className="notify-message-content">
                                    <div className="information-name">Bob</div>
                                    <div className="information-message">aaa</div>
                                </div>
                            </div>
                            <div className="notify-right">
                                <div className="information-button information-close-button">
                                    <FormattedMessage
                                        id='close'
                                        defaultMessage='Close'
                                    />
                                </div>
                                <div className="information-button information-check-button">
                                    <FormattedMessage
                                        id='check'
                                        defaultMessage='Check'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="information-content">
                            <div className="notify-left">
                                <Image verticalAlign="top"
                                       className="notify-avatar"
                                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                       avatar/>
                                <div className="notify-message-content">
                                    <div className="information-name">Bob</div>
                                    <div className="information-message">aaa</div>
                                </div>
                            </div>
                            <div className="notify-right">
                                <div className="information-button information-close-button">
                                    <FormattedMessage
                                        id='close'
                                        defaultMessage='Close'
                                    />
                                </div>
                                <div className="information-button information-check-button">
                                    <FormattedMessage
                                        id='check'
                                        defaultMessage='Check'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-bottom">
                        <div className="info-check-more" onClick={() => this.checkMoreInfo()}>
                            点击查看更多
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;