import React, {Component} from 'react';
import '../css/profileEdit.css';
import xImage from '../css/images/newEvent/x.svg';
import octionEyeClosedImage from '../css/images/userEdit/octicon_eye-closed.svg';
import octionEyeImgae from '../css/images/userEdit/octicon_eye.svg';
import contentSaveImage from '../css/images/userEdit/content-save.svg';
import checkImage from '../css/images/userEdit/check.svg';
import slashImage from '../css/images/userEdit/slash.svg';
import {userModel} from "../models/UserModel";
import {editUser} from "../actions/editUser";
import Select from "react-select";

const options = [
    {value: "Разработчик", label: "Разработчик"},
    {value: "Дизайнер", label: "Дизайнер"},
    {value: "Ивент менеджер", label: "Ивент менеджер"},
    {value: "Менеджер", label: "Менеджер"}
];

class UserEdit extends Component {

    constructor(props) {
        super(props);

        const pos = userModel.user.position === null ? "" : userModel.user.position;
        const ct = userModel.user.city === null ? '' : userModel.user.city;
        const phn = userModel.user.phone === null ? '' : userModel.user.phone;
        this.state = {
            first_name: userModel.user.first_name,
            last_name: userModel.user.last_name,
            position: pos,
            phone: phn,
            city: ct,
            new_password: '',
            confirm_new_password: '',
            checkPassword: null,
            checkConfirmPassword: null,
        }
    }

    componentDidMount() {
        const checkPassword = document.getElementById("password-valid-ico");
        const checkConfirmPassword = document.getElementById("confirm-password-valid-ico");
        this.setState({
            checkPassword: checkPassword,
            checkConfirmPassword: checkConfirmPassword,
        });

        console.log(checkConfirmPassword);
        console.log(checkPassword);
    }

    onFirstNameChange = event => {
        this.setState({
            first_name: event.target.value,
        })
    };

    onLastNameChange = event => {
        this.setState({
            last_name: event.target.value,
        })
    };

    onPositionChange = event => {
        this.setState({
            position: event.value,
        })
    };

    onPhoneChange = event => {
        this.setState({
            phone: event.target.value,
        })
    };

    onCityChange = event => {
        this.setState({
            city: event.target.value,
        })
    };

    onNewPasswordChange = event => {
        this.setState({
            new_password: event.target.value,
        });
        if (event.target.value === '') {
            this.state.checkConfirmPassword.setAttribute('opacity', "0");
        } else {
            this.state.checkConfirmPassword.setAttribute('opacity', "1");
        }
    };

    onConfirmNewPasswordChange = event => {
        this.setState({
            confirm_new_password: event.target.value,
        });
        if (event.target.value === '') {
            this.state.checkConfirmPassword.setAttribute('opacity', "0");
        } else {
            if (event.target.value === this.state.new_password) {
                this.state.checkConfirmPassword.setAttribute('opacity', "1");
                this.state.checkConfirmPassword.setAttribute("src", checkImage)
            } else {
                this.state.checkConfirmPassword.setAttribute("src", slashImage);
                this.state.checkConfirmPassword.setAttribute('opacity', "1");

            }
        }
    };



    onSaveUserEdition = () => {
        if (this.state.new_password === this.state.confirm_new_password) {
            const password = (this.state.new_password === '') ? null : this.state.new_password;
            console.log(password);
            editUser({
                id: userModel.user.id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                position: this.state.position,
                phone: this.state.phone,
                city: this.state.city,
                pass: password
            });
        }
    };

    onEyeClick = event => {
        if (event.target.id === "img1") {
            const input = document.getElementById("new-password");
            this.onVisibilityPasswordChange(event, input);
        } else {
            const input = document.getElementById("confirm-new-password");
            this.onVisibilityPasswordChange(event, input);
        }

    };

    onVisibilityPasswordChange = (event, input) => {
        if (event.target.getAttribute("src") === octionEyeImgae) {
            event.target.setAttribute("src", octionEyeClosedImage);
            input.setAttribute("type", "password");
        } else {
            event.target.setAttribute("src", octionEyeImgae);
            input.setAttribute("type", "text");
        }
    };

    onXClick = () => {
        userModel.userEditIsOpen = false;
    };

    render() {
        return (
            <div
                name="profile-edit-form"
                className="window-form"
                style={{width: '300px'}}
            >

                <div className="window-upper-panel">
                    <div className="window-title-style">Редактирование профиля</div>
                    <img src={xImage} alt="X" onClick={this.onXClick}/>
                </div>

                <div className="window-content">
                    <div className="content-container">

                        <div className="field-column-container">
                            <label
                                htmlFor="first-name"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Имя
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="first-name"
                                    type="text"
                                    id="first-name"
                                    value={this.state.first_name}
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="1"
                                    required
                                    onChange={this.onFirstNameChange}
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="last-name"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Фамилия
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="last-name"
                                    type="text"
                                    id="last-name"
                                    value={this.state.last_name}
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="2"
                                    required
                                    onChange={this.onLastNameChange}
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="position"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Должность
                            </label>
                            <div className="field-row-container RegistrationPos">
                                <Select
                                    className="RegPosSelect"
                                    name="position"
                                    required
                                    value={this.state.selectedOption}
                                    onChange={this.onPositionChange}
                                    options={options}
                                    styles={ this.customStyles }
                                    placeholder="должность"
                                    noOptionsMessage={"Нет групп"}
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "#F2F2F2",
                                        },
                                    })}
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="phone"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Телефон
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="phone"
                                    type="tel"
                                    id="phone"
                                    value={this.state.phone}
                                    pattern="\+?[0-9]\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="4"
                                    onChange={this.onPhoneChange}
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="city"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Город
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="city"
                                    type="text"
                                    id="city"
                                    value={this.state.city}
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="5"
                                    onChange={this.onCityChange}
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <div className="title-item">
                                <span></span>
                                <div className="text-style" style={{ margin: '0'}}>Изменение пароля</div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="new-password"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Новый пароль
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style pass-field"
                                    name="new-password"
                                    type="password"
                                    id="new-password"
                                    form="profile-edit-form"
                                    minLength="6"
                                    maxLength="30"
                                    placeholder=" "
                                    autoComplete="off"
                                    tabIndex="6"
                                    onChange={this.onNewPasswordChange}
                                />
                                <img id="img1" src={octionEyeClosedImage} alt="" className="pass-show-ico" onClick={this.onEyeClick}/>
                                    <a className="empty-icon-style icon-wrapper">
                                        <img id="password-valid-ico" src={checkImage} alt="" className="valid-ico"/>
                                    </a>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="confirm-new-password"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Подтверждение нового пароля
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style pass-field"
                                    name="confirm-new-password"
                                    type="password"
                                    id="confirm-new-password"
                                    form="profile-edit-form"
                                    minLength="6"
                                    maxLength="30"
                                    placeholder=" "
                                    autoComplete="off"
                                    tabIndex="7"
                                    onChange={this.onConfirmNewPasswordChange}
                                />
                                <img id="img2" src={octionEyeClosedImage} alt="" className="pass-show-ico" onClick={this.onEyeClick}/>
                                <a className="empty-icon-style icon-wrapper">
                                    <img id="confirm-password-valid-ico" src={checkImage} alt="" className="valid-ico"/>
                                </a>
                            </div>
                        </div>

                        <div className="button-container">
                            <button
                                className="button-style"
                                name="save"
                                type="submit"
                                id="save"
                                formTarget="_self"
                                tabIndex="8"
                                onClick={this.onSaveUserEdition}
                            >
                                <img src={contentSaveImage} alt=""/>
                                    <div className="text-style">Сохранить</div>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }

}

export default UserEdit;
