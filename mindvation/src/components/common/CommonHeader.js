import React, {Component} from 'react';
import {Header, Button} from 'semantic-ui-react';
import {logOut} from '../../actions/logon_action';

class CommonHeader extends Component {

    userLogOut() {
        this.props.dispatch(logOut());
        this.props.history.push('/');
    }

    render() {
        /*if (!this.props.userInfo.message) {
            let redirect = this.props.location.pathname + this.props.location.search;
            this.props.history.push('/login?message=login&redirect_uri=' + encodeURIComponent(redirect));
        }*/
        return (
            <Header as='h2' textAlign='center'>
                <span style={{color: '#f9f9f9'}}>Mindvation</span>
                <Button floated='right' onClick={() => this.userLogOut()}>Log out</Button>
            </Header>
        );
    }
}

export default CommonHeader;
