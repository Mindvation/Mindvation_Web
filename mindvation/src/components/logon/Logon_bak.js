import React, {Component} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment, Input} from 'semantic-ui-react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';
import {isEmpty} from '../../util/CommUtil';

let userName;
let passWord;

class Logon extends Component {
    state = {
        selfChecked: false
    };

    logonService() {
        const {userLogon, history} = this.props;
        const user = {
            "account": userName.inputRef.value,
            "password": passWord.inputRef.value
        };
        this.setState({
            selfChecked: true
        });
        if (isEmpty(user.account) || isEmpty(user.password)) return;
        const callback = () => {
            history.push('/home')
        };
        userLogon(user, callback);
    }

    render() {
        const {userInfo} = this.props;
        const {formatMessage} = this.props.intl;

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
                            <FormattedMessage
                                id='logInAccount'
                                defaultMessage='Log-in to your account!'
                            />
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
                                        placeholder={formatMessage(messages.userNameDescription)}
                                        ref={node => userName = node}
                                        error={this.state.selfChecked && isEmpty(userName.inputRef.value)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder={formatMessage(messages.passWordDescription)}
                                        type='password'
                                        ref={node => passWord = node}
                                        error={this.state.selfChecked && isEmpty(passWord.inputRef.value)}
                                    />
                                </Form.Field>
                                <Button color='teal' fluid size='large'
                                        onClick={() => this.logonService()}>
                                    <FormattedMessage
                                        id='logIn'
                                        defaultMessage='Log in'
                                    />
                                </Button>
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

export default injectIntl(Logon);