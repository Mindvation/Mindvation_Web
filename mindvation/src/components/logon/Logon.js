import React, {Component} from 'react';
import {logon} from '../../actions/logon_action';
import {Button, Form, Grid, Header, Image, Message, Segment, Input} from 'semantic-ui-react';
import {
    Redirect
} from 'react-router-dom';
import 'url-search-params-polyfill';

let userName;
let passWord;

class Logon extends Component {
    constructor(props) {
        super(props);
    }

    logonService() {
        const user = {
            "phoneNumber": userName.inputRef.value,
            "password": passWord.inputRef.value
        };
        //TODO this.props.dispatch(logon(user,this.props.history));
        this.props.dispatch(logon(user));
    }

    render() {
        const {userInfo} = this.props;

        if (userInfo.responseCode === "000") {
            let redirect = this.props.location.pathname + this.props.location.search;
            let urlParams = new URLSearchParams(decodeURIComponent(redirect));
            let newUrl = urlParams.get("redirect_uri");
            return (
                <Redirect to={{
                    pathname: newUrl ? newUrl : '/homePage'
                }}/>
            )
        }

        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={require('../../res/image/logo.png')}/>
                            {' '}Log-in to your account
                        </Header>
                        {userInfo.responseCode && userInfo.responseCode !== "000" ?
                            <Message style={{textAlign: 'left'}} error>
                                <p>{userInfo.message}</p>
                            </Message> : null}
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Field>
                                    <Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='User Name'
                                        ref={node => userName = node}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        ref={node => passWord = node}
                                    />
                                </Form.Field>
                                <Button color='teal' fluid size='large'
                                        onClick={() => this.logonService()}>Login</Button>
                            </Segment>
                        </Form>
                        {/*<Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>*/}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Logon;