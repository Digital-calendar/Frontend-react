import React, {Component} from 'react';
import xImage from '../../css/images/newEvent/x.svg';
import lBImage from '../../css/images/newEvent/light_bookmark.svg';
import lCImage from '../../css/images/newEvent/light_clock.svg';
import bSLImage from '../../css/images/newEvent/bytesize_location.svg';
import pAOImage from '../../css/images/newEvent/person-add-outline.svg';
import rBOImage from '../../css/images/newEvent/radio-button-on.svg';
import aUOImage from '../../css/images/newEvent/arrow-undo-outline.svg';
import pPOImage from '../../css/images/newEvent/paper-plane-outline.svg';
import cEOImage from '../../css/images/newEvent/chatbubble-ellipses-outline.svg';
import cSImage from '../../css/images/newEvent/content-save.svg';
import tOImage from '../../css/images/newEvent/trash-outline.svg';
import '../../css/newEvent.css';
import {Redirect} from 'react-router-dom';
import CustomSelect from "../CustomSelect";
import {userModel} from "../../models/UserModel";
import {observer} from "mobx-react";
import {createEvent} from "../../actions/createEvent";
import {loadUsers} from "../../actions/loadUsers";
import {eventModel} from "../../models/EventModel";


@observer
class NewEvent extends Component {

    constructor(props) {
        super(props);

        loadUsers();
        userModel.selectedUsers = [];
        const contact = userModel.user.phone === null ? '' : userModel.user.phone;

        this.state = {
            title: '',
            date: this.props.date,
            time: '',
            location: '',
            isPrivate: true,
            eventType: 'INTERNAL',
            contactInfo: contact,
            contactName: userModel.user.last_name + ' ' + userModel.user.first_name,
            description: '',
            options: [],
        };

    }

    getSelectedUsers = () => {

        let selectedUsers = [];

        userModel.selectedUsers.forEach(item => {
            selectedUsers.push(userModel.users.find(el => el.id === item.id));
        });

        selectedUsers.push(userModel.user);

        return selectedUsers;
    };

    onSaveClick = () => {
        createEvent({
            title: this.state.title,
            timestamp: this.state.date + ' ' + this.state.time,
            location: this.state.location,
            eventType: this.state.eventType,
            contactInfo: this.state.contactInfo,
            contactName: this.state.contactName,
            description: this.state.description,
            participants: this.getSelectedUsers(),
            privateEvent: this.state.isPrivate,
            userID: userModel.user.id
        });
        eventModel.isPresent = false;
        this.onCancelClick();
    };

    onOptionChange = event => {
        const newOptions = userModel.users.map(item => {
            const value = item.first_name + ' ' + item.last_name;
            return {value: value, label: value, id: item.id};
        });
        this.setState({
            options: newOptions
        });
        userModel.dropLoadedFlag();
    };

    onCancelClick = () => {
        eventModel.isNewEventModalOpen = false;
    };

    onTitleInput = event => {
        this.setState({
            title: event.target.value
        })
    };

    onDateInput = event => {

        this.setState({
            date: event.target.value
        })
    };

    onTimeInput = event => {
        this.setState({
            time: event.target.value
        })
    };

    onLocationInput = event => {
        this.setState({
            location: event.target.value
        })
    };

    onPrivateClick = () => {
        this.setState({
            isPrivate: !this.state.isPrivate
        })
    };

    onEventTypeChange = event => {
        this.setState({
            eventType: event.target.value.toUpperCase()
        })
    };

    onContactInput = event => {
        this.setState({
            contactInfo: event.target.value
        })
    };

    onAddressInput = event => {
        this.setState({
            contactName: event.target.value
        })
    };

    onDescriptionInput = event => {
        this.setState({
            description: event.target.value
        })
    };


    render() {
        if (userModel.isNewUsersLoaded) {
            this.onOptionChange();
        }

        return (
            <div id="new-event-form" name="new-event-form" className="window-form">

                <div className="window-upper-panel">
                    <div className="invisible-ico"/>
                    <div className="window-title-style">New Event</div>
                    <img
                        src={xImage}
                        alt="X"
                        style={{outline: "none"}}
                        tabIndex="13"
                        onClick={this.onCancelClick}
                    />
                </div>

                <div className="window-content">
                    <div className="main-container">

                        <div className="left-fields-container">

                            <div className="field-container">
                                <label htmlFor="title">
                                    <img
                                        src={lBImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <input
                                    className="text-style input-field-style"
                                    name="title"
                                    type="text"
                                    placeholder="enter the title"
                                    id="title"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="1"
                                    onChange={this.onTitleInput}
                                    required
                                />
                            </div>
                            <div className="field-container">
                                <label htmlFor="date">
                                    <img
                                        src={lCImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <input
                                    className="text-style input-field-style"
                                    name="date"
                                    type="date"
                                    id="date"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="2"
                                    required
                                    value={this.state.date}
                                    onChange={this.onDateInput}
                                />
                                <label htmlFor="time"></label>
                                <input
                                    className="text-style input-time-field-style"
                                    name="time"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    defaultValue="00:00"
                                    id="time"
                                    // form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="3"
                                    onChange={this.onTimeInput}
                                />
                            </div>
                            <div className="field-container">
                                <label htmlFor="location">
                                    <img
                                        src={bSLImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <input
                                    className="text-style input-field-style"
                                    name="location"
                                    type="text"
                                    placeholder="enter location"
                                    id="location"
                                    form="new-event-form"
                                    tabIndex="4"
                                    onChange={this.onLocationInput}
                                />
                            </div>
                            <div className="field-container">
                                <label htmlFor="invite-field">
                                    <img
                                        src={pAOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <CustomSelect
                                    options={this.state.options}
                                    name={'filterType'}
                                    isMulti={true}
                                    placeholder={'Filter'}
                                    isNewEvent={true}
                                />
                            </div>
                            <div className="field-container">
                                <div className="private-event">
                                    <img
                                        src={rBOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                    <div className="window-title-style" style={{marginLeft: "3px", fontSize: "14px"}}>
                                        Private event
                                    </div>
                                </div>
                                <label
                                    className="toggle-switch"
                                    id="toggle"
                                    style={{visibility: userModel.userEditIsOpen ? "hidden" : "visible"}}
                                >
                                    <input
                                        name="private-event-toggle"
                                        type="checkbox"
                                        form="new-event-form"
                                        tabIndex="6"
                                        onChange={this.onPrivateClick}
                                    />
                                    <span></span>
                                </label>
                                <label htmlFor="select"></label>
                                <select className="text-style select-event" name="select" id="select"
                                        form="new-event-form" tabIndex="7" onClick={this.onEventTypeChange}>
                                    <option defaultValue="INTERNAL">Internal</option>
                                    <option defaultValue="EXTERNAL">External</option>
                                    <option defaultValue="CORRESPONDENCE">Correspondence</option>
                                </select>
                            </div>
                            <div className="field-container">
                                <div className="feedback-item">
                                    <span></span>
                                    <div className="text-style" style={{margin: 0}}>
                                        Feedback
                                    </div>
                                </div>
                            </div>
                            <div className="field-container">
                                <label htmlFor="feedback-contact">
                                    <img
                                        src={aUOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <input
                                    className="text-style input-field-style"
                                    name="feedback-contact"
                                    type="text"
                                    pattern="(\+?[0-9]\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})|(^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)"
                                    placeholder="phone or email"
                                    id="feedback-contact"
                                    form="new-event-form"
                                    value={this.state.contactInfo}
                                    tabIndex="8"
                                    onChange={this.onContactInput}
                                />
                            </div>
                            <div className="field-container">
                                <label htmlFor="signature">
                                    <img
                                        src={pPOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                </label>
                                <input
                                    className="text-style input-field-style"
                                    name="signature"
                                    type="text"
                                    placeholder="how can address you?"
                                    id="signature"
                                    form="new-event-form"
                                    tabIndex="9"
                                    value={this.state.contactName}
                                    onChange={this.onAddressInput}
                                />
                            </div>

                        </div>

                        <div className="right-fields-container">

                            <div className="field-container">
                                <label htmlFor="description">
                                    <img
                                        src={cEOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                        style={{marginTop: 0, alignSelf: "start"}}
                                    />
                                </label>
                                <textarea
                                    className="-new-event-text-style new-event-input-field-style new-event-textarea-field"
                                    name="description"
                                    id="description"
                                    placeholder="enter the description"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="10"
                                    onChange={this.onDescriptionInput}
                                />
                                <label htmlFor="description"/>
                            </div>
                            <div className="button-container">
                                <button
                                    className="button-style"
                                    name="save"
                                    type="submit"
                                    id="save"
                                    // formTarget="_self"
                                    tabIndex="11"
                                    onClick={this.onSaveClick}
                                >
                                    <img
                                        src={cSImage}
                                        alt=""
                                    />
                                    <div className="text-style">
                                        Save
                                    </div>
                                </button>
                                <button
                                    className="button-style"
                                    type="submit"
                                    id="cancel"
                                    tabIndex="12"
                                    onClick={this.onCancelClick}
                                >
                                    <img
                                        src={tOImage}
                                        alt=""
                                    />
                                    <div className="text-style">
                                        Cancel
                                    </div>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        );

    }

}

export default NewEvent;

