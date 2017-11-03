import React, {Component} from 'react';
import {Button, Image, Message, Input} from 'semantic-ui-react';
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
                <Image className="logon-back-image" src={require('../../res/image/bg_img.png')}/>
                <div className="logon-content">
                    <div className="logon-header">
                        <FormattedMessage
                            id='mindvations'
                            defaultMessage='Mindvations'
                        />
                    </div>
                    <Input
                        fluid
                        icon={
                            <Image src={require('../../res/image/account_ic.png')}/>
                        }
                        iconPosition='left'
                        placeholder={formatMessage(messages.userNameDescription)}
                        ref={node => userName = node}
                        error={this.state.selfChecked && isEmpty(userName.inputRef.value)}
                        className="logon-input logon-user-name"
                    />
                    <Input
                        fluid
                        icon={
                            <Image src={require('../../res/image/password_ic.png')}/>
                        }
                        iconPosition='left'
                        placeholder={formatMessage(messages.passWordDescription)}
                        type='password'
                        ref={node => passWord = node}
                        error={this.state.selfChecked && isEmpty(passWord.inputRef.value)}
                        className="logon-input logon-password"
                    />

                    {userInfo.responseCode && userInfo.responseCode !== "000" ?
                        <Message style={{textAlign: 'left'}} error>
                            <p>{userInfo.message}</p>
                        </Message> : null}

                    <Button size='large' className="logon-button"
                            onClick={() => this.logonService()}>
                        <FormattedMessage
                            id='logIn'
                            defaultMessage='Log in'
                        />
                    </Button>
                </div>
            </div>
        );
    }
}

export default injectIntl(Logon);