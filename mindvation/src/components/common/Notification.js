import React, {Component} from 'react';
import {notification} from 'antd';
import {Image, Button} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';
import {messages} from '../../res/language/defineMessages';

let webSocket;

class Notification extends Component {
    componentDidMount() {
        webSocket = new WebSocket("ws://192.168.0.108:8080/websocket/123");
        webSocket.onopen = () => {
            console.info('webSocket connected')
        };
        webSocket.onclose = () => {
            console.info('webSocket closed')
        };
        webSocket.onmessage = (e) => {
            this.openNotification(e.data);
        };
    }

    componentWillUnmount() {
        notification.destroy();
        webSocket.close();
    }

    checkDetail = (key) => {
        notification.close(key);
        this.goToPage('S1');
    };

    goToPage = (searchId) => {
        switch (searchId.substr(0, 1)) {
            case "P":
                this.props.history.push(`/home/projects/${searchId}`);
                break;
            case "R":
                this.props.history.push(`/home/requirement/${searchId}`);
                break;
            case "S":
                this.props.history.push(`/home/story/${searchId}`);
                break;
        }
    };

    openNotification = (message) => {
        const {formatMessage} = this.props.intl;

        const key = `open${Date.now()}`;

        const msg = <div className="notify-content">
            <div className="notify-left">
                <Image verticalAlign="top"
                       className="notify-avatar"
                       src={'http://112.74.45.247:8080/mdvn-file-papi/3bd93652-6911-4398-8fdc-112b041af865259457427738561.jpg'}
                       avatar/>
                <div className="notify-message-content">
                    <div className="notify-name">Bob</div>
                    <div className="notify-message">{message}</div>
                </div>
            </div>
            <div className="notify-right">
                <div className="notify-button notify-check-button" onClick={() => this.checkDetail(key)}>
                    {formatMessage(messages.checkDesc)}
                </div>
                <div className="notify-button notify-close-button" onClick={() => notification.close(key)}>
                    {formatMessage(messages.closeDesc)}
                </div>
            </div>
        </div>;

        notification.open({
            message: '',
            description: msg,
            placement: 'bottomRight',
            duration: 0,
            key
        });
    };

    render() {
        return false;
    }
}

export default injectIntl(Notification);
