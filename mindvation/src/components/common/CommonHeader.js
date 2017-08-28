import React, {Component} from 'react';
import {Header, Button} from 'semantic-ui-react';
import {logOut} from '../../actions/logon_action';
import {FormattedMessage} from 'react-intl';

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
            <Header as='h2' textAlign='center'>
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
