import React, {Component} from 'react';
import '../css/registration.css';
import {Redirect} from 'react-router';
import Select from 'react-select';

const options = [
    {value: "DEVELOPER", label: "Разработчик"},
    {value: "DESIGNER", label: "Дизайнер"},
    {value: "EVENT_MANAGER", label: "Ивент менеджер"},
    {value: "MANAGER", label: "Менеджер"}
];

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                isRedirectToSignIn: false,
                first_name: "",
                last_name: "",
                position: "",
                email: "",
                pass: ""
            },
            passwordRepeat: "",
            isSuccess: false,
            isPassCorrect: false,
            isPositionActive: false,
            selectedOption: null
        }
    }


    submitForm = async e => {
        e.preventDefault();
        let path = document.getElementsByClassName('windowRegistration__error_handler')[0];
        if (this.state.isPassCorrect) {
            if (this.state.isPositionActive) {
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
                        throw new Error("Неизвестная ошибка сети");
                    }

                    if (resp.status === 205) {
                        throw new Error("Пользователь с таким email уже существует");
                    }

                    if (resp.status === 201) {
                        this.setState({isSuccess: true});
                    } else {
                        throw new Error("Сервер вернул ошибку: " + resp.status); //дебаг
                    }

                } catch (e) {
                    path.textContent = e.message;
                    path.style.visibility = "visible"
                }
                this.state = {

                }
            } else {
                path.textContent = "Выберите должность"
                path.style.visibility = "visible"
            }
        } else {
            path.textContent = "Пароли не совпадают"
            path.style.visibility = "visible"
        }


    };

    handleSubmit = e => {
        document.getElementsByClassName('windowRegistration__error_handler')[0].style.visibility = "hidden";
        this.checkPass();
        if (e.target.name !== "passwordRepeat") {
            this.setState({
                data: {...this.state.data, [e.target.name]: e.target.value}
            });
        }
        console.log(this.state)
    };

    positionSubmit = (selectedOption) => {
        this.checkPosition();
        this.setState({
            data: { ...this.state.data, position: selectedOption.value },
            selectedOption: selectedOption
        }, function () {
            console.log(this.state.data.position)
        })
    };

    checkPosition = () => {
        if (this.state.data.position !== null) {
            this.setState({
                isPositionActive: true
            })
        } else {
            this.setState({
                isPositionActive: false
            })
        }
    };

    // handlePass = e => {
    //     document.getElementsByClassName('windowRegistration__error_handler')[0].style.visibility = "hidden";
    //     this.checkPassReap(e);
    //     this.setState({
    //         data: {...this.state.data, [e.target.name]: e.target.value}
    //     })
    // };

    checkPass = () => {
        let path_pass = document.getElementsByClassName('RegistrationPassword')[0];
        let path_reap = document.getElementsByClassName('RegistrationPassRepeat')[0];
        if (path_pass.value === path_reap.value) {
            path_pass.style.borderColor = '#FFFFFF';
            path_reap.style.borderColor = '#FFFFFF';
            this.setState({
                isPassCorrect: true
            })
        } else {
            path_pass.style.borderColor = '#F14048';
            path_reap.style.borderColor = '#F14048';
            this.setState({
                isPassCorrect: false
            })
        }
    };

    // checkPassReap = e => {
    //     let path =
    //     if (path.value === e.target.value) {
    //         e.target.style.borderColor = '#FFFFFF';
    //         path.style.borderColor = '#FFFFFF';
    //     } else {
    //         e.target.style.borderColor = '#F14048';
    //         path.style.borderColor = '#F14048';
    //     }
    // };

    onSignInClick = () => {
        this.setState({
            isRedirectToSignIn: true,
        })
    };

    render() {
        if (this.state.isRedirectToSignIn) {
            return <Redirect to='/'/>
        }

        return (
            <div className="windowRegistration">
                {this.state.isSuccess ? <Redirect to="/"/> : null}
                <div className="windowRegistration__RectTop">
                    <button
                        className="signInTop"
                        onClick={this.onSignInClick}
                    >
                        вход
                    </button>
                </div>
                <div className="windowRegistration__mainBg" style={{height: window.innerHeight - 40}}>
                    <div className="windowRegistration__mainWindow">
                        <div className="windowRegistration__mainWindow__RectCenter"/>
                        <div>
                            <form onSubmit={this.submitForm} className="windowRegistration__mainWindow__formGroup">
                                <p className="windowRegistration__error_handler">ну пипетс</p>
                                <input
                                    className="RegistrationFirstName"
                                    type="text"
                                    autoFocus
                                    placeholder="имя"
                                    name="first_name"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationLastName"
                                    type="text"
                                    placeholder="фамилия"
                                    name="last_name"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input
                                    className="RegistrationEmail"
                                    type="email"
                                    placeholder="почта"
                                    name="email"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <Select
                                    className="RegistrationPosition"
                                    name="position"
                                    required
                                    value={this.state.selectedOption}
                                    onChange={this.positionSubmit}
                                    options={options}
                                    styles={ this.customStyles }
                                    placeholder="должность"
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "rgba(47,47,47,0.65)",
                                            primary25: "#F2F2F2"
                                        },
                                    })}
                                />
                                <input
                                    className="RegistrationPassword"
                                    type="password"
                                    placeholder="пароль"
                                    minLength="6"
                                    maxLength="30"
                                    name="pass"
                                    onChange={this.handleSubmit}
                                    autoComplete={false}
                                    required
                                />
                                <input
                                    className="RegistrationPassRepeat"
                                    type="password"
                                    placeholder="подтверждение пароля"
                                    minLength="6"
                                    maxLength="30"
                                    name="passwordRepeat"
                                    onChange={this.handleSubmit}
                                    required
                                />
                                <input className="RegistrationSignUp" type="submit" value="Зарегестрироваться"
                                       name="signUp"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
