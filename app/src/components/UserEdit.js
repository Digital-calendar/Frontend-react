import React, {Component} from 'react';
import '../css/profileEdit.css';
import xImage from '../css/images/newEvent/x.svg';
import octionEyeClosedImage from '../css/images/userEdit/octicon_eye-closed.svg';
import octionEyeImgae from '../css/images/userEdit/octicon_eye.svg';
import contentSaveImage from '../css/images/userEdit/content-save.svg';
import checkImage from '../css/images/userEdit/check.svg';


class UserEdit extends Component {


    render() {
        return (
            <form
                name="profile-edit-form"
                className="window-form"
                style={{width: '300px'}}
            >

                <div className="window-upper-panel">
                    <div className="window-title-style">Profile Edit</div>
                    <img src={xImage} alt="X"/>
                </div>

                <div className="window-content">
                    <div className="content-container">

                        <div className="field-column-container">
                            <label
                                htmlFor="first-name"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                First name
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="first-name"
                                    type="text"
                                    id="first-name"
                                    value=""
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="1"
                                    required
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
                                Last name
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="last-name"
                                    type="text"
                                    id="last-name"
                                    value=""
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="2"
                                    required
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
                                Employee's position
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="position"
                                    type="text"
                                    id="position"
                                    value=""
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="3"
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
                                Phone
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="phone"
                                    type="tel"
                                    id="phone"
                                    value=""
                                    pattern="\+?[0-9]\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="4"
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
                                City
                            </label>
                            <div className="field-row-container">
                                <input
                                    className="text-style input-field-style"
                                    name="city"
                                    type="text"
                                    id="city"
                                    value=""
                                    form="profile-edit-form"
                                    autoComplete="off"
                                    tabIndex="5"
                                />
                                <div className="empty-icon-style"></div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <div className="title-item">
                                <span></span>
                                <div className="text-style" style={{ margin: '0'}}>Change password</div>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="new-password"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                New password
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
                                />
                                <img src={octionEyeImgae} alt="" className="pass-show-ico"/>
                                    <a className="empty-icon-style icon-wrapper">
                                        <img src={checkImage} alt="" className="valid-ico"/>
                                    </a>
                            </div>
                        </div>
                        <div className="field-column-container">
                            <label
                                htmlFor="confirm-new-password"
                                className="text-style input-label"
                                style={{color: "#BDBDBD"}}
                            >
                                Confirm new password
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
                                />
                                <img src={octionEyeImgae} alt="" className="pass-show-ico"/>
                                    <a className="empty-icon-style icon-wrapper">
                                        <img src={checkImage} alt="" className="valid-ico"/>
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
                                onClick="this.blur();">
                                <img src={contentSaveImage} alt=""/>
                                    <div className="text-style">Save</div>
                            </button>
                        </div>

                    </div>
                </div>

            </form>
        )
    }

}

export default UserEdit;
