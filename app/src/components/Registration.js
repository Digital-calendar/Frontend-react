import React, { Component } from 'react';
import '../css/registration.css';
import { Redirect } from 'react-router';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                pass: ""
            },
            isSuccess: false,
            isPassCorrect: true
        }
    }

    

     submitForm = async e => {
        e.preventDefault();

        try {
            const resp = await fetch("/api/users/sign_up", {
                method: "POST",
                body: JSON.stringify(this.state.data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!resp.ok) {
                throw new Error("Неизвестная ошибка сети");
            }
            
            if (resp.status === 226) {
                throw new Error("Пользователь с таким email уже существует");
            }

            if (resp.status === 200) {
                console.log(await resp.json()); //дебаг
                alert("Регистрация прошла успешно");
                this.setState({isSuccess: true});
            } else {
                throw new Error("Сервер вернул ошибку" + resp.status);
            }

        } catch (e) {
            alert(e);
        }

    };

    handleSubmit = e =>
        this.setState({
           data : {...this.state.data, [e.target.name]: e.target.value}
        });

    checkPass = e => {
        if (this.state.data.pass === e.target.value) {
            e.target.style.borderColor = 'white';
            document.getElementsByClassName('password')[0].style.borderColor = 'white';
        } else {
            e.target.style.borderColor = 'red';
            document.getElementsByClassName('password')[0].style.borderColor = 'red';
        }
    };

    render() {


        return (

            <div className="window">
                {this.state.isSuccess ? <Redirect to = "/login"/> : null}
                <div className="window__RectTop">
                    <button className="signInTop" > <a className="signInTop__link" href={'http://localhost:3000/login'}>sign in</a></button>
                </div>
                <div className="window__mainBg">
                    <div className="window__mainWindow">
                        <div className="window__mainWindow__RectCenter"/>
                        <div className="window__mainWindow__formGroup">
                            <form onSubmit={this.submitForm}>
                                <input
                                    className="firstName"
                                    type="text"
                                    autoFocus
                                    placeholder="first name"
                                    name="firstName"
                                    required
                                />
                                <input
                                    className="lastName"
                                    type="text"
                                    placeholder="last name"
                                    name="lastName"
                                    required
                                />
                                <input
                                    className="email"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    value={this.state.data.email}
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="password"
                                    type="password"
                                    placeholder="password"
                                    name="pass"
                                    value={this.state.data.pass}
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="passRepeat"
                                    type="password"
                                    placeholder="confirm password"
                                    name="passwordRepeat"
                                    onChange={this.checkPass}
                                    required
                                />
                                <input className="signUp" type="submit" value="sign up" name="signUp"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;