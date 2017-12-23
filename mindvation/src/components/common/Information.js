import React, {Component} from 'react';
import {Badge} from 'antd';
import MVImage from './Image';
import {Image} from 'semantic-ui-react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getInformationList, removeInformation} from '../../actions/information_action';
import $ from 'jquery';
import {getProjectById} from '../../actions/project_action';
import {getRequirementById} from '../../actions/requirement_action';
import {getStoryById, clearStory} from '../../actions/story_action';
import {messages} from '../../res/language/defineMessages';
import {getDateDiff} from '../../util/CommUtil';

const size = 3;

class Information extends Component {
    state = {
        showInfo: false
    };

    componentDidMount() {
        this.props.dispatch(getInformationList(this.props.information.infoList.length, size, this.scrollToBottom));
    }

    checkMoreInfo = () => {
        this.props.dispatch(getInformationList(this.props.information.infoList.length, size, this.scrollToBottom));
    };

    toggleInfo = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    };

    hiddenInfo = () => {
        this.setState({
            showInfo: false
        })
    };

    formatInfo = (res) => {
        const {formatMessage} = this.props.intl;
        let info = {};
        info.id = res.uuId;
        info.avatar = res.initiator.avatar;
        info.name = res.initiator.name;
        info.time = getDateDiff(res.createTime);
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

    checkDetail = (info) => {
        this.props.dispatch(removeInformation(info.id));
        this.hiddenInfo();
        this.goToPage(info.searchId);
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

    deleteInformation = (info) => {
        this.props.dispatch(removeInformation(info.id));
    };

    scrollToBottom = () => {
        let timer = setTimeout(() => {
            let targetElm = this.refs.infoContent;
            let tempScrollTop = targetElm.scrollHeight - targetElm.offsetHeight;
            $(targetElm).animate({scrollTop: tempScrollTop}, 400);
            timer && clearTimeout(timer);
            return false;
        }, 0);
    };

    getInfoContent = (information) => {
        if (information.infoList && information.infoList.length > 0) {
            return information.infoList.map((item, i) => {
                const info = this.formatInfo(item);
                return <div className="information-content" key={i}>
                    <div className="notify-left">
                        <Image verticalAlign="top"
                               className="notify-avatar"
                               src={info.avatar}
                               avatar/>
                        <div className="notify-message-content">
                            <div className="display-flex">
                                <div className="information-name">{info.name}</div>
                                <div className="information-time">{info.time}</div>
                            </div>
                            <div className="information-message">{info.message}</div>
                        </div>
                    </div>
                    <div className="notify-right">
                        <div className="information-button information-close-button"
                             onClick={() => this.deleteInformation(info)}
                        >
                            <FormattedMessage
                                id='close'
                                defaultMessage='Close'
                            />
                        </div>
                        <div className="information-button information-check-button"
                             onClick={() => this.checkDetail(info)}>
                            <FormattedMessage
                                id='check'
                                defaultMessage='Check'
                            />
                        </div>
                    </div>
                </div>
            })
        }
        return null;
    };

    render() {
        const {showInfo} = this.state;
        const {information} = this.props;
        return (
            <div className={(showInfo ? "active-info " : "") + "info-content"} tabIndex="-1"
                 onBlur={() => this.hiddenInfo()}>
                <div onClick={() => this.toggleInfo()} className="info-badge">
                    <Badge count={information.totalNumber} showZero>
                        <MVImage name="notify"/>
                    </Badge>
                </div>
                <div className={"info-down-content"}>
                    <div className="info-top" ref="infoContent">
                        {this.getInfoContent(information)}
                    </div>
                    <div className="info-bottom">
                        <div className="info-check-more" onClick={() => this.checkMoreInfo()}>
                            <FormattedMessage
                                id='clickForMore'
                                defaultMessage='Click For More'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Information);