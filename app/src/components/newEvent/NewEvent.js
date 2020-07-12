import React, {Component} from 'react';
import xImage from '../../css/images/newEvent/x.svg';
import lBImage from '../../css/images/newEvent/light_bookmark.svg';
import lCImage from '../../css/images/newEvent/light_clock.svg';
import bSLImage from '../../css/images/newEvent/bytesize_location.svg';
import pAOImage from '../../css/images/newEvent/person-add-outline.svg';
import rBOImage from '../../css/images/newEvent/radio-button-on.svg';
import deadlineImage from '../../css/images/newEvent/radio-button-on-deadline.svg'
import aUOImage from '../../css/images/newEvent/arrow-undo-outline.svg';
import pPOImage from '../../css/images/newEvent/paper-plane-outline.svg';
import cEOImage from '../../css/images/newEvent/chatbubble-ellipses-outline.svg';
import cSImage from '../../css/images/newEvent/content-save.svg';
import tOImage from '../../css/images/newEvent/trash-outline.svg';
import fImage from '../../css/images/newEvent/bi_file-earmark-plus.svg';
import '../../css/newEvent.css';
import CheckBoxTreeSelect from "../CheckBoxTreeSelect.js"
import {userModel} from "../../models/UserModel";
import {observer} from "mobx-react";
import {createEvent} from "../../actions/createEvent";
import {loadUsers} from "../../actions/loadUsers";
import {eventModel} from "../../models/EventModel";
import {editEvent} from "../../actions/editEvent";
import {uploadFiles} from "../../actions/uploadFiles";

@observer
class NewEvent extends Component {

    constructor(props) {
        super(props);

        loadUsers();
        userModel.selectedUsers = [];
        const contact = userModel.user.phone === null ? '' : userModel.user.phone;
        const location = userModel.user.city === null ? '' : userModel.user.city;
        console.log(userModel.user);
        if (this.props.event == null) {
            this.state = {
                title: '',
                date: this.props.date,
                timeBegin: '00:00',
                timeEnd: '23:59',
                deadlineDate: '',
                deadlineTime: '00:00',
                location: location,
                isPrivate: false,
                eventType: 'INTERNAL',
                contactInfo: contact,
                contactName: userModel.user.last_name + ' ' + userModel.user.first_name,
                description: '',
                selectedFiles: [],
                options: [],
                deadlineEvent: false,
                isTitleRequired: false,
                isDateRequired: false,
                isLocationRequired: false,
                isTimeBeginRequired: false,
                isTimeEndRequired: false,
                isDeadlineToggle: false,
                isTimeDeadlineRequired: false,
                isDateDeadlineRequired: false
            };
        } else {
            this.state = {
                title: this.props.event.title,
                date: this.props.event.timestamp_begin.slice(0, 10),
                timeBegin: this.props.event.timestamp_begin.slice(-5),
                timeEnd: this.props.event.timestamp_end.slice(-5),
                deadlineDate: this.props.event.deadline === null ? '' : this.props.event.deadline.slice(0, 10),
                deadlineTime: this.props.event.deadline === null ? '00:00' : this.props.event.deadline.slice(-5),
                location: this.props.event.location,
                isPrivate: this.props.event.privateEvent,
                eventType: this.props.event.eventType,
                contactInfo: this.props.event.contactInfo,
                contactName: userModel.user.last_name + ' ' + userModel.user.first_name,
                description: this.props.event.description,
                selectedFiles: this.props.event.fileName,
                options: this.props.event.participants,
                deadlineEvent: this.props.event.deadlineEvent,
                isTitleRequired: false,
                isDateRequired: false,
                isLocationRequired: false,
                isTimeBeginRequired: false,
                isTimeEndRequired: false,
                isDeadlineToggle: this.props.event.deadline !== null,
                isTimeDeadlineRequired: false,
                isDateDeadlineRequired: false
            };
            console.log(this.state.date)
            eventModel.progressUploadFiles = '100%';
        }
    }

    getSelectedUsers = () => {

        let selectedUsers = [];

        userModel.selectedUsers.forEach(item => {
            selectedUsers.push(userModel.users.find(el => el.id === item.id));
        });

        selectedUsers.push(userModel.user);

        console.log(selectedUsers)
        return selectedUsers;
    };

    getNextDayFromDate = (date) => {
        let d = new Date(date);
        d.setDate(d.getDate() + 1);
        return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
            .map(n => n < 10 ? 0 + '' + n : n).join('-')
    }

    timeComparatorLeftMoreThenRight = (leftTime, rightTime , date) => {
        let t1 = new Date(date + 'T' + leftTime);
        let t2 = new Date(date + 'T' + rightTime);
        return t1.getTime() >= t2.getTime();
    }

    onSaveClick = () => {
        let isTimeBeginValid = (/^([01]{1}[0-9]|2[0-3]):[0-5][0-9]$/).test(this.state.timeBegin);
        let isTimeEndValid = (/^([01]{1}[0-9]|2[0-3]):[0-5][0-9]$/).test(this.state.timeEnd);
        let isTimeDeadlineValid = (/^([01]{1}[0-9]|2[0-3]):[0-5][0-9]$/).test(this.state.deadlineTime);

        let dateEnd = this.state.date;
        if (isTimeBeginValid && isTimeEndValid && (this.state.date !== '')) {
            if (this.timeComparatorLeftMoreThenRight(this.state.timeBegin, this.state.timeEnd, this.state.date)) {
                dateEnd = this.getNextDayFromDate(this.state.date);
            }
        }

        let isDateDeadlineNoValid = this.state.isDateDeadlineRequired;
        let deadline = '';
        if (this.state.isDeadlineToggle) {
            if (this.state.deadlineDate !== '') {
                let deadlineDate = new Date(this.state.deadlineDate);
                let eventDate = new Date(this.state.date);
                if (deadlineDate.getTime() < eventDate.getTime()) {
                    isDateDeadlineNoValid = true;
                } else if (deadlineDate.getTime() === eventDate.getTime()) {
                    if (isTimeDeadlineValid && isTimeBeginValid) {
                        let timeDeadline = new Date("2020-01-01T" + this.state.deadlineTime);
                        let timeBeginEvent = new Date("2020-01-01T" + this.state.timeBegin);
                        isTimeDeadlineValid = timeDeadline.getTime() > timeBeginEvent.getTime();
                    }
                }

                if (isTimeDeadlineValid) {
                    deadline = this.state.deadlineDate + ' ' + this.state.deadlineTime;
                }
            } else {
                isDateDeadlineNoValid = true;
            }

            setTimeout(() => {
                if (!isTimeDeadlineValid) {
                    this.deadlineTimeInput.focus();
                } else if (isDateDeadlineNoValid) {
                    this.deadlineDateInput.focus();
                }
            }, 500);
        }

        this.focusingOnInvalidFields(
            this.state.title === '',
            this.state.date === '',
            this.state.location === '',
            !isTimeBeginValid,
            !isTimeEndValid);

        eventModel.isPresent = false;
        this.setState({
            isTitleRequired: this.state.title === '',
            isDateRequired: this.state.date === '',
            isLocationRequired: this.state.location === '',
            isTimeBeginRequired: !isTimeBeginValid,
            isTimeEndRequired: !isTimeEndValid,
            isTimeDeadlineRequired: !isTimeDeadlineValid,
            isDateDeadlineRequired: isDateDeadlineNoValid
        });

        eventModel.isNewEventModalOpen =
            ((this.state.title === '') ||
                (this.state.date === '') ||
                (this.state.location === '') ||
                (!isTimeBeginValid) ||
                (!isTimeEndValid) ||
                (!isTimeDeadlineValid) ||
                isDateDeadlineNoValid);

        if (eventModel.isNewEventModalOpen) {
            return;
        }

        if (this.props.event == null) {
            createEvent({
                title: this.state.title,
                timestamp_begin: this.state.date + ' ' + this.state.timeBegin,
                timestamp_end: dateEnd + ' ' + this.state.timeEnd,
                deadline: deadline,
                location: this.state.location,
                eventType: this.state.eventType,
                contactInfo: this.state.contactInfo,
                contactName: this.state.contactName,
                description: this.state.description,
                fileName: this.state.selectedFiles,
                participants: this.getSelectedUsers(),
                privateEvent: this.state.isPrivate,
                userID: userModel.user.id,
                deadlineEvent: this.state.deadlineEvent
            });
        } else {
            console.log(this.state.selectedFiles);
            editEvent({
                title: this.state.title,
                timestamp_begin: this.state.date + ' ' + this.state.timeBegin,
                timestamp_end: dateEnd + ' ' + this.state.timeEnd,
                deadline: deadline,
                location: this.state.location,
                eventType: this.state.eventType,
                contactInfo: this.state.contactInfo,
                contactName: this.state.contactName,
                description: this.state.description,
                fileName: this.state.selectedFiles.reverse().reverse(), //такой костыль потому что selectedFiles обернут в proxy
                participants: this.getSelectedUsers(),
                privateEvent: this.state.isPrivate,
                userID: userModel.user.id,
                deadlineEvent: this.state.deadlineEvent
            }, this.props.event.id);
        }

        if (eventModel.isNewEventModalOpen) {
            eventModel.progressUploadFiles = '0%';
        }

        eventModel.eventForEdit = null;
        if (this.props.event !== null && !eventModel.isNewEventModalOpen) {
            setTimeout(() => window.location.reload(), 55)
        }
    };

    focusingOnInvalidFields = (titleRequired,
                               dateRequired,
                               locationRequired,
                               timeBeginRequired,
                               timeEndRequired) => {
        this.mainContainer.scrollIntoView({block: "start", behavior: "smooth"});
        setTimeout(() => {
            if (titleRequired) {
                this.titleInput.focus();
            } else if (dateRequired) {
                this.dateInput.focus();
            } else if (locationRequired) {
                this.locationInput.focus();
            } else if (timeBeginRequired) {
                this.timeBeginInput.focus();
            } else if (timeEndRequired) {
                this.timeEndInput.focus();
            }
        }, 500);
    }

    onOptionChange = () => {
        const newOptions = [];
        userModel.users.forEach(item => {
            if (item.id !== userModel.user.id) {
                const value = item.first_name + ' ' + item.last_name;
                newOptions.push({name: value, id: item.id, position: item.position});
            }
        });
        this.setState({
            options: newOptions
        });
        userModel.dropLoadedFlag();
    };

    onCancelClick = () => {
        eventModel.eventForEdit = null;
        eventModel.isNewEventModalOpen = false;
        eventModel.progressUploadFiles = '0%';
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

    onDeadlineDateInput = event => {
        this.setState({
            deadlineDate: event.target.value,
            isDateDeadlineRequired: false
        })
    }

    onTimeBeginInput = event => {
        this.setState({
            timeBegin: event.target.value,
            isTimeBeginRequired: false
        })
    };

    onTimeEndInput = event => {
        this.setState({
            timeEnd: event.target.value,
            isTimeEndRequired: false
        })
    };

    onTimeDeadlineInput = event => {
        this.setState({
            deadlineTime: event.target.value,
            isTimeDeadlineRequired: false
        })
    }

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

    onDeadlineToggleClick = () => {
        this.setState({
            isDeadlineToggle: !this.state.isDeadlineToggle,
            deadlineDate: '',
            deadlineTime: "00:00"
        })
    }

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
        const fd = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].size === 0) {
                continue;
            }
            newSF.push(event.target.files[i].name);
            fd.append("files", event.target.files[i], event.target.files[i].name);
        }
        this.setState({
            selectedFiles: newSF
        });

        uploadFiles(fd);
    }

    onRenderNameFile = fileName => {
        if (fileName.length > 9) {
            return (fileName.substring(0, 9) + "...");
        } else {
            return (fileName);
        }
    }

    onDeleteSelectedFile = event => {
        let sf = this.state.selectedFiles;
        sf.splice(event.target.name, 1);
        this.setState({
            selectedFiles: sf
        });

        if (this.state.selectedFiles.length === 0) {
            eventModel.progressUploadFiles = '0%';
        }
    }

    getMarks = () => {
        let view = [];

        switch (this.state.eventType) {
            case "INTERNAL":
                view.push(
                    <option key={1} selected defaultValue="Внутреннее">Внутреннее</option>,
                    <option key={2} defaultValue="Внешнее">Внешнее</option>,
                    <option key={3} defaultValue="Очное">Очное</option>
                );
                break;
            case "EXTERNAL":
                view.push(               
                    <option key={1} defaultValue="Внутреннее">Внутреннее</option>,
                    <option key={2} selected defaultValue="Внешнее">Внешнее</option>,
                    <option key={3} defaultValue="Очное">Очное</option>
                );
                break;
            case "CORRESPONDENCE":
                view.push(              
                    <option key={1} defaultValue="Внутреннее">Внутреннее</option>,
                    <option key={2} defaultValue="Внешнее">Внешнее</option>,
                    <option key={3} selected defaultValue="Очное">Очное</option>
                );
                break;
            default:
                view.push(
                    <option key={1} defaultValue="Внутреннее">Внутреннее</option>,
                    <option key={2} defaultValue="Внешнее">Внешнее</option>,
                    <option key={3} defaultValue="Очное">Очное</option>
                );
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
                    <div className="main-container"
                         ref={(mainContainer) => {this.mainContainer = mainContainer}}
                    >

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
                                    ref={(titleInput) => {this.titleInput = titleInput}}
                                    style={{borderColor: this.state.isTitleRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
                                    value={this.state.title === null ? '' : this.state.title}
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
                                    ref={(dateInput) => {this.dateInput = dateInput}}
                                    style={{borderColor: this.state.isDateRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
                                    value={this.state.date}
                                    onChange={this.onDateInput}
                                />
                                <label
                                    className="text-style new-event-label-for-time"
                                    htmlFor="timeBegin"
                                >
                                    от
                                </label>
                                <input
                                    className="text-style input-time-field-style"
                                    name="timeBegin"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    id="time"
                                    autoComplete="off"
                                    tabIndex="3"
                                    value={this.state.timeBegin}
                                    onChange={this.onTimeBeginInput}
                                    ref={(timeBeginInput) => {this.timeBeginInput = timeBeginInput}}
                                    style={{borderColor: this.state.isTimeBeginRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : '',}}
                                    required
                                />
                                <label
                                    className="text-style new-event-label-for-time"
                                    htmlFor="timeEnd"
                                >
                                    до
                                </label>
                                <input
                                    className="text-style input-time-field-style"
                                    name="timeEnd"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    defaultValue="23:59"
                                    id="timeEnd"
                                    autoComplete="off"
                                    tabIndex="3"
                                    value={this.state.timeEnd}
                                    onChange={this.onTimeEndInput}
                                    ref={(timeEndInput) => {this.timeEndInput = timeEndInput}}
                                    style={{borderColor: this.state.isTimeEndRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : ''}}
                                    required
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
                                    value={this.state.location === null ? '' : this.state.location}
                                    tabIndex="4"
                                    ref={(locationInput) => {this.locationInput = locationInput}}
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
                                <div className="customCheckBox">
                                    <CheckBoxTreeSelect
                                        isNewEvent={true}
                                        options={this.state.options}
                                        users={this.state.options}
                                    />
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="private-event">
                                    <img
                                        src={rBOImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                    <div className="window-title-style" style={{marginLeft: "3px", fontSize: "16px"}}>
                                        Личное
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
                                        defaultChecked={this.state.isPrivate}
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
                                <div className="private-event"
                                    style={{borderColor: "#FD5052"}}>
                                    <img
                                        src={deadlineImage}
                                        alt=""
                                        className="new-event-icon-style"
                                    />
                                    <div className="window-title-style" style={{marginLeft: "3px", fontSize: "16px"}}>
                                        Дедлайн
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
                                        defaultChecked={this.state.isDeadlineToggle}
                                        tabIndex="6"
                                        onChange={this.onDeadlineToggleClick}
                                    />
                                    <span></span>
                                </label>
                                <label htmlFor="deadlineDate"/>
                                <input
                                    className="text-style input-field-style"
                                    name="deadlineDate"
                                    type="date"
                                    id="date"
                                    form="new-event-form"
                                    autoComplete="off"
                                    tabIndex="7"
                                    ref={(deadlineDateInput) => {this.deadlineDateInput = deadlineDateInput}}
                                    style={{
                                        borderColor: this.state.isDateDeadlineRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : '',
                                        maxWidth: '170px',
                                        visibility: this.state.isDeadlineToggle ? "visible" : "hidden"
                                    }}
                                    value={this.state.deadlineDate}
                                    onChange={this.onDeadlineDateInput}
                                />
                                <label htmlFor="timeEnd"/>
                                <input
                                    className="text-style input-time-field-style"
                                    name="timeEnd"
                                    type="text"
                                    pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                                    defaultValue="23:59"
                                    id="timeEnd"
                                    autoComplete="off"
                                    tabIndex="3"
                                    value={this.state.deadlineTime}
                                    onChange={this.onTimeDeadlineInput}
                                    ref={(deadlineTimeInput) => {this.deadlineTimeInput = deadlineTimeInput}}
                                    style={{
                                        borderColor: this.state.isTimeDeadlineRequired
                                            ? 'rgba(201, 6, 52, 1)'
                                            : '',
                                        maxWidth: '70px',
                                        visibility: this.state.isDeadlineToggle ? "visible" : "hidden"
                                    }}
                                    required
                                />
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
                                    {this.state.selectedFiles.map((fileName, index) => (
                                        <div className="new-event-file" key={index}>
                                            <div className="text-style">
                                                {this.onRenderNameFile(fileName)}
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
                            <div className="new-event-file-progress"
                                 style={{
                                     display: eventModel.progressUploadFiles === '0%' ? 'none' : 'flex'
                                 }}
                            >
                                <div
                                    className="new-event-file-progress-line"
                                    style={{
                                        width: eventModel.progressUploadFiles
                                    }}
                                >
                                    {eventModel.progressUploadFiles}
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
                                    disabled={((this.state.selectedFiles.length > 0) && (eventModel.progressUploadFiles !== '100%'))}
                                >
                                    <img
                                        src={cSImage}
                                        alt=""
                                    />
                                    <div className="text-style">
                                        {this.props.event === null ? "Создать" : "Обновить"}
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

