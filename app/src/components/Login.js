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
        });
        userModel.isInValidLoginOrPassword = false;
    };

    onPassInput = event => {
        this.setState({
            passText: event.target.value
        });
        userModel.isInValidLoginOrPassword = false;
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
        if (userModel.isPresent) {
            return <Redirect to='/calendar' />;
        }
        
        return (

            <div className="windowRegistration">

                <div className="windowRegistration__RectTop">
                    <button className="signInTop"><a className="signInTop__link" href={'http://localhost:3000/'}>sign
                        up</a></button>
                </div>

                <div className="windowRegistration__mainBg" style={{height: window.innerHeight - 40}}>
                    <div className="windowRegistration__mainWindow">
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
                                    style={{borderColor: userModel.isInValidLoginOrPassword
                                            ? 'rgba(201, 6, 52, 1)'
                                            : 'rgba(0, 0, 0, 0.25)'}}
                                    onChange={this.onLoginInput}
                                    required
                                />
                                <input
                                    className="pass"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    style={{borderColor: userModel.isInValidLoginOrPassword
                                            ? 'rgba(201, 6, 52, 1)'
                                            : 'rgba(0, 0, 0, 0.25)'}}
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
