import React, { Component } from 'react';
import '.././css/login.css';
import {userSignIn} from "../actions/signIn";
import {Redirect} from 'react-router-dom';
import {userModel} from "../models/UserModel";
import {observer} from "mobx-react";

@observer
class Login extends Component {


    state = {
        emailText: '',
        passText: '',
        user: {}
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


        userSignIn({
            email: currentEmail,
            pass: currentPassword
        });

        this.setState({
            emailText: '',
            passText: '',
            user: userModel.user
        });
    };

    render() {
        if (userModel.user !== null) {
            return <Redirect to='/calendar/month' />;
        }

        return (

            <div className="window">
                <div className="window__RectTop"/>
                <div className="window__mainBg">
                    <div className="window__mainWindow">
                        <div className="window__mainWindow__RectCenter"/>
                        <div className="window__mainWindow__formGroup">
                            <form
                                method="post"
                                action="http://localhost:3000/calendar/month"
                                onSubmit={this.onSubmit}
                            >
                                <input
                                    className="login"
                                    type="email"
                                    autoFocus
                                    placeholder="login"
                                    name="login"
                                    value={this.state.emailText}
                                    onChange={this.onLoginInput}
                                    required
                                />
                                <input
                                    className="pass"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={this.state.passText}
                                    onChange={this.onPassInput}
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
