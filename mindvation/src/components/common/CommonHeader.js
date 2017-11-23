import React, {Component} from 'react';
import {logOut} from '../../actions/logon_action';
import {FormattedMessage} from 'react-intl';
import {getUser} from '../../util/UserStore';

class CommonHeader extends Component {

    userLogOut() {
        this.props.dispatch(logOut());
        this.props.history.push('/');
    }

    render() {
        /*if (!this.props.userInfo.language) {
            let redirect = this.props.location.pathname + this.props.location.search;
            this.props.history.push('/login?language=login&redirect_uri=' + encodeURIComponent(redirect));
        }*/
        return (
            <div className="common-header">
                <div className="header-product">
                    <FormattedMessage
                        id='mindvations'
                        defaultMessage='Mindvations'
                    />
                </div>
                <div className="display-flex">
                    <div className="header-name">
                        {getUser().name}
                    </div>
                    <div className="log-out-button" onClick={() => this.userLogOut()}>
                        <FormattedMessage
                            id='logOut'
                            defaultMessage='Log out'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CommonHeader;
