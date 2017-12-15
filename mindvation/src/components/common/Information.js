import React, {Component} from 'react';
import {Badge} from 'antd';
import MVImage from './Image';
import {Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getInformationList} from '../../actions/information_action';

let startNum = 0;
const size = 3;

class Information extends Component {
    state = {
        showInfo: false
    };

    componentDidMount() {
        this.props.dispatch(getInformationList(startNum, size));
    }

    checkMoreInfo = () => {

    };

    toggleInfo = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    };

    hiddenInfo = () => {
        /*this.setState({
            showInfo: false
        })*/
    };

    formatInfo = (res) => {
        let info = {};
        info.avatar = res.initiator.avatar;
        info.name = res.initiator.name;
        if (res.type === 'update' && res.subjectType === "project") {
            info.message = "更新了" + res.subjectId;
            info.searchId = res.subjectId;
        }
        return info;
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
                            <div className="information-name">{info.name}</div>
                            <div className="information-message">{info.message}</div>
                        </div>
                    </div>
                    <div className="notify-right">
                        <div className="information-button information-close-button">
                            <FormattedMessage
                                id='close'
                                defaultMessage='Close'
                            />
                        </div>
                        <div className="information-button information-check-button"
                             onClick={() => this.goToPage(info.searchId)}>
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
                    <div className="info-top">
                        {this.getInfoContent(information)}
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