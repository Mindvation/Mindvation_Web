import React, {Component} from 'react';
import {notification} from 'antd';
import {Image} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';
import {messages} from '../../res/language/defineMessages';
import {getStaffId} from '../../util/UserStore';
import {getProjectById} from '../../actions/project_action';
import {getRequirementById} from '../../actions/requirement_action';
import {getStoryById, clearStory} from '../../actions/story_action';

let webSocket;

class Notification extends Component {
    componentDidMount() {
        webSocket = new WebSocket("ws://192.168.0.254:8080/mdvn-websocket/websocket/" + getStaffId());
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
                if (this.props.history.location.pathname === `/home/projects/${searchId}`) {
                    this.props.dispatch(getProjectById(searchId));
                } else {
                    this.props.history.push(`/home/projects/${searchId}`);
                }
                break;
            case "R":
                if (this.props.history.location.pathname === `/home/requirement/${searchId}`) {
                    this.props.dispatch(getRequirementById(searchId));
                } else {
                    this.props.history.push(`/home/requirement/${searchId}`);
                }
                break;
            case "S":
                if (this.props.history.location.pathname === `/home/story/${searchId}`) {
                    this.props.dispatch(clearStory());
                    this.props.dispatch(getStoryById(searchId));
                } else {
                    this.props.history.push(`/home/story/${searchId}`);
                }
                break;
            default:
                return;
        }
    };

    formatNotify = (res) => {
        const {formatMessage} = this.props.intl;
        res = JSON.parse(res);
        let info = {};
        info.avatar = res.initiator.avatar;
        info.name = res.initiator.name;
        if (res.subjectType === "project" || res.subjectType === "requirement" || res.subjectType === "story") {
            if (res.type === 'update') {
                info.message = formatMessage(messages.notifyUpdated) + res.subjectId;
                info.searchId = res.subjectId;
            } else if (res.type === 'create') {
                info.message = formatMessage(messages.notifyCreated) + res.subjectId;
                info.searchId = res.subjectId;
            }
        } else if (res.subjectType === "task") {
            if (res.type === 'update') {
                info.message = formatMessage(messages.notifyUpdated) + res.subjectId;
                info.searchId = res.taskByStoryId;
            } else if (res.type === 'create') {
                info.message = formatMessage(messages.notifyCreated) + res.subjectId;
                info.searchId = res.taskByStoryId;
            } else if (res.type === "update progress") {
                info.message = formatMessage(messages.notifyUpdated) + res.subjectId
                    + formatMessage(messages.notifyProgress) + ": " + res.oldProgress + "% -- " + res.newProgress + "%";
                info.searchId = res.taskByStoryId;
            }
        } else if (res.subjectType === "comment") {
            if (res.type === 'at') {
                info.message = formatMessage(messages.notifyLeaveMessage);
                info.searchId = res.subjectId;
            }
        } else if (res.subjectType === "issue") {
            if (res.type === 'create') {
                info.message = formatMessage(messages.notifyCreatedIssue);
                info.searchId = res.subjectId;
            } else if (res.type === 'adopt') {
                info.message = formatMessage(messages.notifyAdoptedAnswer);
                info.searchId = res.subjectId;
            }
        } else if (res.subjectType === "answer") {
            info.message = formatMessage(messages.notifyAnsweredIssue);
            info.searchId = res.subjectId;
        }

        return info;
    };

    openNotification = (message) => {
        const {formatMessage} = this.props.intl;

        const key = `open${Date.now()}`;

        const info = this.formatNotify(message);

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
