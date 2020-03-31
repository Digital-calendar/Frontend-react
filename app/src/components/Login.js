import React, { Component } from 'react';
import '.././css/login.css';

class Registration extends Component {
    render() {

        return (
            <div className="window">
                <div className="window__RectTop"/>
                <div className="window__mainBg">
                    <div className="window__mainWindow">
                        <div className="window__mainWindow__RectCenter"/>
                        <div className="window__mainWindow__formGroup">
                            <form method="post" action="/api/users/sign_in">
                                <input
                                    className="login"
                                    type="email"
                                    autoFocus
                                    placeholder="login"
                                    name="login"
                                />
                                <input
                                    className="pass" type="password" placeholder="password" name="password"
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

export default Registration;