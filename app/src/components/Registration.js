import React, {Component} from 'react';
import '../css/registration.css';
import {Redirect} from 'react-router';
import md5 from 'md5';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                first_name: "",
                last_name: "",
                email: "",
                pass: ""
            },
            isSuccess: false
            // isPassCorrect: true
        }
    }


    submitForm = async e => {
        e.preventDefault();
        this.state.data.pass = md5(this.state.data.pass);
        try {
            const resp = await fetch("/api/users/sign_up", {
                method: "POST",
                dataType: 'json',
                body: JSON.stringify(this.state.data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!resp.ok) {
                console.log(resp); //дебаг
                throw new Error("Неизвестная ошибка сети");
            }

            if (resp.status === 205) {
                throw new Error("Пользователь с таким email уже существует");
            }

            if (resp.status === 201) {
                alert("Регистрация прошла успешно");
                this.setState({isSuccess: true});
            } else {
                throw new Error("Сервер вернул ошибку: " + resp.status); //дебаг
            }

        } catch (e) {
            alert(e);
        }

    };

    handleSubmit = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });


    checkPass = e => {
        if (this.state.data.pass === e.target.value) {
            e.target.style.borderColor = '#FFFFFF';
            document.getElementsByClassName('RegistrationPassword')[0].style.borderColor = '#FFFFFF';
        } else {
            e.target.style.borderColor = '#F14048';
            document.getElementsByClassName('RegistrationPassword')[0].style.borderColor = '#F14048';
        }
    };

    render() {
        return (
            <div className="windowRegistration">
                {this.state.isSuccess ? <Redirect to="/login"/> : null}
                <div className="windowRegistration__RectTop">
                    <button className="signInTop"><a className="signInTop__link" href={'http://localhost:3000/login'}>sign
                        in</a></button>
                </div>
                <div className="windowRegistration__mainBg">
                    <div className="windowRegistration__mainWindow">
                        <div className="windowRegistration__mainWindow__RectCenter"/>
                        <div>
                            <form onSubmit={this.submitForm} className="windowRegistration__mainWindow__formGroup">
                                <input
                                    className="RegistrationFirstName"
                                    type="text"
                                    autoFocus
                                    placeholder="first name"
                                    name="first_name"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationLastName"
                                    type="text"
                                    placeholder="last name"
                                    name="last_name"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationEmail"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationPassword"
                                    type="password"
                                    placeholder="password"
                                    name="pass"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationPassRepeat"
                                    type="password"
                                    placeholder="confirm password"
                                    name="passwordRepeat"
                                    onChange={this.checkPass}
                                    required
                                />
                                <input className="RegistrationSignUp" type="submit" value="sign up" name="signUp"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;