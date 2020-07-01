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
import fImage from '../../css/images/newEvent/bi_file-earmark-plus.svg';
import '../../css/newEvent.css';
import CustomSelect from "../CustomSelect";
import {userModel} from "../../models/UserModel";
import {observer} from "mobx-react";
import {createEvent} from "../../actions/createEvent";
import {loadUsers} from "../../actions/loadUsers";
import {eventModel} from "../../models/EventModel";
import {toJS} from "mobx";
import {editEvent} from "../../actions/editEvent";


@observer
class NewEvent extends Component {

    constructor(props) {
        super(props);

        loadUsers();
        userModel.selectedUsers = [];
        const contact = userModel.user.phone === null ? '' : userModel.user.phone;
        console.log(this.props.event)
        if (this.props.event == null) {
            this.state = {
              title: null,
              date: this.props.date,
              time: '00:00',
              location: null,
              isPrivate: false,
              eventType: 'INTERNAL',
              contactInfo: contact,
              contactName: userModel.user.last_name + ' ' + userModel.user.first_name,
              description: '',
              selectedFiles: [],
              options: [],
              isTitleRequired: false,
              isDateRequired: false,
              isLocationRequired: false,
            };
        } else {

            this.state = {
                title: this.props.event.title,
                date: this.props.event.timestamp_begin.slice(0, 10),
                time: this.props.event.timestamp_begin.slice(-5),
                location: this.props.event.location,
                isPrivate: this.props.event.isPrivate,
                eventType: this.props.event.eventType,
                contactInfo: this.props.event.contactInfo,
                contactName: userModel.user.last_name + ' ' + userModel.user.first_name,
                description: this.props.event.description,
                selectedFiles: [], //нужно изменить!
                options: [],
                isTitleRequired: false,
                isDateRequired: false,
                isLocationRequired: false,
            };
            console.log(this.state.date)
        }
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
        if (this.props.event == null) {
            createEvent({
                title: this.state.title,
                timestamp_begin: this.state.date + ' ' + this.state.time,
                timestamp_end: this.state.date + ' ' + '23:59',
                location: this.state.location,
                eventType: this.state.eventType,
                contactInfo: this.state.contactInfo,
                contactName: this.state.contactName,
                description: this.state.description,
                files: this.state.selectedFiles,
                participants: this.getSelectedUsers(),
                privateEvent: this.state.isPrivate,
                userID: userModel.user.id
            });
        } else {
            editEvent({
                title: this.state.title,
                timestamp_begin: this.state.date + ' ' + this.state.time,
                timestamp_end: this.state.date + ' ' + '23:59',
                location: this.state.location,
                eventType: this.state.eventType,
                contactInfo: this.state.contactInfo,
                contactName: this.state.contactName,
                description: this.state.description,
                files: this.state.selectedFiles,
                participants: this.getSelectedUsers(),
                privateEvent: this.state.isPrivate,
                userID: userModel.user.id
            }, this.props.event.id);
        }
        eventModel.isPresent = false;
        this.setState({
            isTitleRequired: this.state.title === null,
            isDateRequired: this.state.date === '',
            isLocationRequired: this.state.location === null,
        })
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
        eventModel.eventForEdit = null;
        eventModel.isNewEventModalOpen = false;
    };

    onTitleInput = event => {
        this.setState({
            title: event.target.value,
            isTitleRequired: false
        })
    };

    onDateInput = event => {
        this.setState({
            date: event.target.value,
            isDateRequired: false
        })
    };

    onTimeInput = event => {
        this.setState({
            time: event.target.value
        })
    };

    onLocationInput = event => {
        this.setState({
            location: event.target.value,
            isLocationRequired: false
        })
    };

    onPrivateClick = () => {
        this.setState({
            isPrivate: !this.state.isPrivate
        })
    };

    onEventTypeChange = event => {
        let type = '';
        switch (event.target.value) {
            case 'Внутреннее':
                type = 'INTERNAL';
                break;
            case 'Внешнее':
                type = 'EXTERNAL';
                break;
            case 'Очное':
                type = 'CORRESPONDENCE';
                break;
            default:
        }
        this.setState({
            eventType: type
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
        if (event.target.value.length > 1000) {
            event.target.value = event.target.value.substring(0, 1000);
        }
        this.setState({
            description: event.target.value
        })
    };

    onFileSelect = event => {
        let newSF = this.state.selectedFiles;
        for (let i = 0; i < event.target.files.length; i++) {
            newSF.push(event.target.files[i]);
        }
        this.setState({
            selectedFiles: newSF
        });
    }

    onRenderNameFile = file => {
        if (file.name.length > 9) {
            return (file.name.substring(0, 9) + "...");
        } else {
            return (file.name);
        }
    }

    onDeleteSelectedFile = event => {
        let sf = this.state.selectedFiles;
        sf.splice(event.target.name, 1);
        this.setState({
            selectedFiles: sf
        });
    }

    getMarks = () => {
        let view = []

        switch (this.state.eventType) {
            case "INTERNAL":
                view.push(
                    <option selected="selected" defaultValue="Внутреннее">Внутреннее</option>,
                    <option defaultValue="Внешнее">Внешнее</option>,
                    <option defaultValue="Очное">Очное</option>
                );
                break;
            case "EXTERNAL":
                view.push(               
                    <option defaultValue="Внутреннее">Внутреннее</option>,
                    <option selected="selected" defaultValue="Внешнее">Внешнее</option>,
                    <option defaultValue="Очное">Очное</option>
                );
                break;
            case "CORRESPONDENCE":
                view.push(              
                    <option defaultValue="Внутреннее">Внутреннее</option>,
                    <option defaultValue="Внешнее">Внешнее</option>,
                    <option selected="selected" defaultValue="Очное">Очное</option>
                );
                break;
            default:
                view.push(
                    <option defaultValue="Внутреннее">Внутреннее</option>,
                    <option defaultValue="Внешнее">Внешнее</option>,
                    <option defaultValue="Очное">Очное</option>
                )
                break;
        }

        return view
    };

    render() {
        if (userModel.isNewUsersLoaded) {
            this.onOptionChange();
        }

        console.log(this.state.date);

        return (
            <div id="new-event-form" name="new-event-form" className="window-form">

                <div className="window-upper-panel">
                    <div className="invisible-ico"/>
                    <div className="window-title-style">{this.props.event == null ? "Новое событие" : "Редактирование события"}</div>
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
                                    placeholder="Заголовок"
                                    id="title"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="1"
                                    style={{borderColor: this.state.isTitleRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
                                    value={this.state.title}
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
                                    style={{borderColor: this.state.isDateRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
                                    value={this.state.date}
                                    onChange={this.onDateInput}
                                />
                                <label
                                    className="text-style new-event-label-for-time"
                                    htmlFor="timeFrom"
                                >
                                    from
                                </label>
                                <input
                                    className="text-style input-time-field-style"
                                    name="timeFrom"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    defaultValue="00:00"
                                    id="time"
                                    // form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="3"
                                    value={this.state.time}
                                    onChange={this.onTimeInput}
                                />
                                <label
                                    className="text-style new-event-label-for-time"
                                    htmlFor="timeTo"
                                >
                                    to
                                </label>
                                <input
                                    className="text-style input-time-field-style"
                                    name="timeTo"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    defaultValue="00:00"
                                    id="time"
                                    autoComplete="off"
                                    tabIndex="3"
                                    value={this.state.time}
                                    onChange=""
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
                                    placeholder="Местоположение"
                                    id="location"
                                    form="new-event-form"
                                    value={this.state.location}
                                    tabIndex="4"
                                    style={{borderColor: this.state.isLocationRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
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
                                    placeholder={'Пригласить людей'}
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
                                        Приватное
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
                                        value={this.state.isPrivate}
                                        tabIndex="6"
                                        onChange={this.onPrivateClick}
                                    />
                                    <span></span>
                                </label>
                                <label htmlFor="select"></label>

                                <select
                                    className="text-style select-event"
                                    name="select"
                                    id="select"
                                    form="new-event-form"
                                    tabIndex="7"
                                    onClick={this.onEventTypeChange}
                                    style={{visibility: this.state.isPrivate ? "hidden" : "visible"}}
                                >
                                    {this.getMarks()}
                                </select>
                            </div>
                            <div className="field-container">
                                <div className="feedback-item">
                                    <span></span>
                                    <div className="text-style" style={{margin: 0}}>
                                        Обратная связь
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
                                    placeholder="телефон или электронная почта"
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
                                    placeholder="как к вам можно обращаться?"
                                    id="signature"
                                    form="new-event-form"
                                    tabIndex="9"
                                    value={this.state.contactName}
                                    onChange={this.onAddressInput}
                                />
                            </div>

                        </div>

                        <div className="right-fields-container">

                            <div className="field-container"
                                 style={{marginBottom: "0px"}}
                            >
                                <label htmlFor="description">
                                    <img
                                        src={cEOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                        style={{marginTop: 0, alignSelf: "start"}}
                                    />
                                </label>
                                <textarea
                                    className="new-event-text-style new-event-input-field-style new-event-textarea-field"
                                    name="description"
                                    id="description"
                                    placeholder="описание"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="10"
                                    value={this.state.description}
                                    onChange={this.onDescriptionInput}
                                />
                                <label htmlFor="description"/>
                            </div>
                            <div className="field-container new-event-text-style"
                                 style={{
                                     justifyContent: "right",
                                     color: "#BDBDBD"
                                 }}>
                                <div>{this.state.description.length} / 1000</div>
                            </div>
                            <div className="field-container">
                                <div className="new-event-file-wrapper">
                                    <input
                                        className="new-event-file-input"
                                        type="file"
                                        name="files"
                                        hidden="hidden"
                                        accept=".jpg, .png, .jpeg, .bmp, .pdf, .doc, .docx, .txt"
                                        ref={fileInput => this.fileInput = fileInput}
                                        onChange={this.onFileSelect}
                                        multiple
                                    />
                                    <button
                                        className="new-event-file-button-add"
                                        style={{background: 'url(' + fImage + ') no-repeat'}}
                                        name="addFile"
                                        type="fileButton"
                                        id="addFile"
                                        tabIndex="11"
                                        onClick={() => this.fileInput.click()}
                                    />
                                </div>
                                <div className="new-event-file-container">
                                    {this.state.selectedFiles.map((file, index) => (
                                        <div className="new-event-file">
                                            <div className="text-style">
                                                {this.onRenderNameFile(file)}
                                            </div>
                                            <img
                                                src={xImage}
                                                alt="X"
                                                style={{outline: "none"}}
                                                name={index}
                                                onClick={this.onDeleteSelectedFile}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="button-container">
                                <button
                                    className="button-style"
                                    name="save"
                                    type="submit"
                                    id="save"
                                    // formTarget="_self"
                                    tabIndex="12"
                                    onClick={this.onSaveClick}
                                >
                                    <img
                                        src={cSImage}
                                        alt=""
                                    />
                                    <div className="text-style">
                                        Создать
                                    </div>
                                </button>
                                <button
                                    className="button-style"
                                    type="submit"
                                    id="cancel"
                                    tabIndex="13"
                                    onClick={this.onCancelClick}
                                >
                                    <img
                                        src={tOImage}
                                        alt=""
                                    />
                                    <div className="text-style">
                                        Отмена
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

