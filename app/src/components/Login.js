import React, { Component } from 'react';
import '.././css/login.css';
import {userSignIn} from "../actions/signIn";

class Login extends Component {

    state = {
        emailText: '',
        passText: '',
    };

    onLoginInput = event => {
        this.setState({
            emailText: event.target.value
        })
    };

    onPassInput = event => {
        this.setState({
            passText: event.target.value
        })
    };

    onSubmit = event => {
        event.preventDefault();

        const currentEmail = this.state.emailText;
        const currentPassword = this.state.passText;

        this.setState({
            emailText: '',
            passText: '',
        });

        userSignIn({
            email: currentEmail,
            pass: currentPassword
        });
    };

    render() {

        console.log("login: ", this.state.emailText);
        console.log("pass: ", this.state.passText);

        return (
            <div className="window">
                <div className="window__RectTop"/>
                <div className="window__mainBg">
                    <div className="window__mainWindow">
                        <div className="window__mainWindow__RectCenter"/>
                        <div className="window__mainWindow__formGroup">
                            <form
                                method="post"
                                action="/api/users/sign_in"
                                onSubmit={this.onSubmit}
                            >
                                <input
                                    className="login"
                                    type="email"
                                    autoFocus
                                    placeholder="login"
                                    name="login"
                                    onInput={this.onLoginInput}
                                    required
                                />
                                <input
                                    className="pass"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    onInput={this.onPassInput}
                                    required
                                />
                                <input
                                    className="signIn"
                                    type="submit"
                                    value="sign in"
                                    name="signIn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
