import React, {Component} from "react";
import {eventModel} from "../../models/EventModel";
import {monthModel} from "../../models/MonthModel";
import {deleteEvent} from "../../actions/deleteEvent";
import downloadImage from "../../css/images/la_download-solid.svg"
import {downloadFiles} from "../../actions/downloadFiles";

class DayEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        };
        if (this.props.date === null) {
            this.state = {date: new Date(monthModel.yearToDisplay, monthModel.monthToDisplay, monthModel.currentDay)}
        } else {
            this.state = {date: this.props.date}
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({date: nextProps.date});
        console.log("поймал - отрисовал " + nextProps.date)
    }

    getMarks = (event) => {
        let view;
        if (event.privateEvent) {
            view = (
                <div className="window__mainWindow__content__eventMark privateEvent_border_color">
                    Личное событие
                </div>
            );
        } else {
            switch (event.eventType) {
                case "INTERNAL":
                    view = (
                        <div className="window__mainWindow__content__eventMark internalEvent_border_color">
                            Внутреннее событие
                        </div>
                    );
                    break;
                case "EXTERNAL":
                    view = (
                        <div className="window__mainWindow__content__eventMark externalEvent_border_color">
                            Внешнее событие
                        </div>
                    );
                    break;
                case "CORRESPONDENCE":
                    view = (
                        <div className="window__mainWindow__content__eventMark correspondenceEvent_border_color">
                            Очное событие
                        </div>
                    );
                    break;
                default:
                    view = null
            }
        }
        return view
    };

    onNewEventClick = (event) => {
        eventModel.eventForEdit = event;
        eventModel.isNewEventModalOpen = true;
    };

    handleDeleteButtonClick = (id) => {
        deleteEvent(id);
        eventModel.isPresent = false;
        setTimeout(() => window.location.reload(), 55)

    };

    onDownloadFileClick = (event) => {
        downloadFiles(event.target.name);
    }

    render() {
        eventModel.filter();
        eventModel.makeDayEvents(this.state.date);

        if (eventModel.dayEvents.length === 0) {
            return (
                <p>Кажется на сегодня событий нет :)</p>
            )
        } else {
            return (

                eventModel.dayEvents.map((event, index) => {
                    return <div key={index} className="window__main">
                        <div className="window__mainWindow__BgTop">
                            <p className="window__mainWindow__BgTop__textTime">
                                {event.timestamp_begin.slice(10, 16)} - {event.timestamp_end.slice(10, 16)}
                            </p>
                        </div>

                        <div className="window__mainWindow__content">
                            <div className="window__mainWindow__content__headline">
                                {event.title}
                            </div>
                            <div className="window__mainWindow__content__description">
                                {event.description}
                            </div>
                            <div className="window__mainWindow_content__filesContainer">
                                {event.fileName.map((fileName, index) => (
                                    <div
                                        className="window__mainWindow_content__file"
                                        style={{
                                            width: fileName.length * 9 + 30,
                                            minWidth: fileName.length * 9 + 30
                                        }}
                                    >
                                        <div>
                                            {fileName}
                                        </div>
                                        <img
                                            src={downloadImage}
                                            alt="↓"
                                            style={{outline: "none"}}
                                            name={fileName}
                                            onClick={this.onDownloadFileClick}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/timePin.svg")} alt="timePin"
                                     className="timePin"/> от {event.timestamp_begin} до {event.timestamp_end}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/locationPin.svg")} alt="locationPin"
                                     className="locationPin"/>
                                {event.location}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/emailPin.svg")} alt="emailPin"
                                     className="emailPin"/>
                                {event.contactInfo}, {event.contactName}
                            </div>
                            <div className="window__mainWindow__content__eventMark_container">
                                {this.getMarks(event)}
                            </div>
                            <div className="window__mainWindow__content__buttons">
                                <button className="window__mainWindow__content__buttons__edit" onClick={() => this.onNewEventClick(event)}>
                                    <img src={require("../../css/images/editButton.svg")} alt="editButton"
                                         className="editButton"/>
                                </button>
                                <button className="window__mainWindow__content__buttons__trash"
                                        onClick={() => this.handleDeleteButtonClick(event.id)}>
                                    <img src={require("../../css/images/trashButton.svg")} alt="trashButton"
                                         className="trashButton"/>
                                </button>
                            </div>
                            <hr className="line"/>
                            <div className="invited_people_container">
                                <div className="invited_people_title">Участники события:</div>

                                {
                                    event.participants.map((participant, index) => {
                                        return <div key={index} className="invited_people_column">
                                            <div className="invited_people_text">
                                                {participant.first_name} {participant.last_name}
                                            </div>
                                            <div className="invited_people_text" style={{marginRight: 10}}>,</div>
                                            <div className="invited_people_text">{participant.position == null ? "должность не указана" : participant.position}</div>
                                        </div>
                                    })
                                }


                            </div>
                        </div>
                    </div>
                })
            )
        }
    }

}

export default DayEvent;
