import React, {Component} from 'react';
import {notification} from 'antd';
import {Image} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';
import {messages} from '../../res/language/defineMessages';
import {getStaffId} from '../../util/UserStore';

let webSocket;

class Notification extends Component {
    componentDidMount() {
        webSocket = new WebSocket("ws://192.168.0.105:10027/mdvn-websocket-sapi/websocket/" + getStaffId());
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

    checkDetail = (key, searchId) => {
        notification.close(key);
        this.goToPage(searchId);
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

    formatMessage = (res) => {
        res = JSON.parse(res);
        let info = {};
        info.avatar = res.initiator.avatar;
        info.name = res.initiator.name;
        if (res.type === 'update' && res.subjectType === "project") {
            info.message = "更新了" + res.subjectId;
            info.searchId = res.subjectId;
        }
        return info;
    };

    openNotification = (message) => {
        const {formatMessage} = this.props.intl;

        const key = `open${Date.now()}`;

        const info = this.formatMessage(message);

        const msg = <div className="notify-content">
            <div className="notify-left">
                <Image verticalAlign="top"
                       className="notify-avatar"
                       src={info.avatar}
                       avatar/>
                <div className="notify-message-content">
                    <div className="notify-name">{info.name}</div>
                    <div className="notify-message">{info.message}</div>
                </div>
            </div>
            <div className="notify-right">
                <div className="notify-button notify-check-button" onClick={() => this.checkDetail(key, info.searchId)}>
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
