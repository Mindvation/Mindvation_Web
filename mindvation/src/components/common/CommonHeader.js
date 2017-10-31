import React, {Component} from 'react';
import {Header, Button, Image, Popup} from 'semantic-ui-react';
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
            <Header as='h2' textAlign='center' className="common-header">
                {/*<span style={{float: 'left', color: '#f9f9f9'}}>
                    {getUser().name}
                </span>*/}
                <div className="display-flex" style={{float: 'left'}}>
                    <Popup
                        className="pre-line"
                        trigger={<Image verticalAlign="middle" src={getUser().avatar} avatar
                                        className="header-avatar"/>}
                        content={<Image verticalAlign="middle" src={getUser().avatar} avatar
                                        style={{width: '10em', height: '10em'}}/>}
                        position="bottom left"
                    />

                    <span style={{color: '#f9f9f9'}}>
                        {getUser().name}
                    </span>
                </div>

                <span style={{color: '#f9f9f9'}}>
                    <FormattedMessage
                        id='mindvation'
                        defaultMessage='Mindvation'
                    />
                </span>

                <Button floated='right' onClick={() => this.userLogOut()}>
                    <FormattedMessage
                        id='logOut'
                        defaultMessage='Log out'
                    />
                </Button>
            </Header>
        );
    }
}

export default CommonHeader;
