import React, {Component} from 'react';
import {Badge} from 'antd';
import MVImage from './Image';
import {Image} from 'semantic-ui-react';

class Information extends Component {
    render() {
        return (
            <div className="info-content">
                <Badge count={108} showZero className="info-badge">
                    <MVImage name="notify"/>
                </Badge>
                <div className="info-down-content">
                    <div className="notify-content">
                        <div className="notify-left">
                            <Image verticalAlign="top"
                                   className="notify-avatar"
                                   src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                   avatar/>
                            <div className="notify-message-content">
                                <div className="notify-name">Bob</div>
                                <div className="notify-message">aaa</div>
                            </div>
                        </div>
                        <div className="notify-right">
                            <div className="notify-button notify-check-button">
                                check
                            </div>
                            <div className="notify-button notify-close-button">
                                close
                            </div>
                        </div>
                    </div>
                    <div className="notify-content">
                        <div className="notify-left">
                            <Image verticalAlign="top"
                                   className="notify-avatar"
                                   src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                                   avatar/>
                            <div className="notify-message-content">
                                <div className="notify-name">Bob</div>
                                <div className="notify-message">aaa</div>
                            </div>
                        </div>
                        <div className="notify-right">
                            <div className="notify-button notify-check-button">
                                check
                            </div>
                            <div className="notify-button notify-close-button">
                                close
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;