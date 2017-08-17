import React, {Component} from 'react';
import {logon} from '../../actions/logon_action';
import {Button, Form, Grid, Header, Image, Message, Segment, Input} from 'semantic-ui-react';
import {
    Redirect
} from 'react-router-dom';

let userName;
let passWord;

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {response: ''};
    }

    logonService() {
        const user = {
            "phoneNumber": userName.inputRef.value,
            "password": passWord.inputRef.value
        };
        this.props.dispatch(logon(user));
    }

    render() {
        const {userInfo} = this.props;

        if (userInfo.message) {
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
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='./logo.png'/>
                            {' '}Log-in to your account
                        </Header>
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
                        <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>

            /*<div>
                userName:<input ref={node => userName = node}/>
                passWord:<input ref={node => passWord = node}/>
                <button onClick={() => this.logonService()}>Logon</button>
                <div>
                    {/!*{this.props.userInfo.message}*!/}
                </div>
            </div>*/
        );
    }
}

export default Logon;