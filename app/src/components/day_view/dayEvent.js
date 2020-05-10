import React, {Component} from "react";
import {eventModel} from "../../models/EventModel";
import {monthModel} from "../../models/MonthModel";
import {deleteEvent} from "../../actions/deleteEvent";

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
        this.setState({date: nextProps.date})

    }

    getMarks = (event) => {
        let view;
        if (event.privateEvent) {
            view = (
                <div className="window__mainWindow__content__eventMark privateEvent_border_color">Private event</div>
            );
        } else {
            switch (event.eventType) {
                case "INTERNAL":
                    view = (
                        <div className="window__mainWindow__content__eventMark internalEvent_border_color">Internal
                            event</div>
                    );
                    break;
                case "EXTERNAL":
                    view = (
                        <div className="window__mainWindow__content__eventMark externalEvent_border_color">External
                            event</div>
                    );
                    break;
                case "CORRESPONDENCE":
                    view = (
                        <div
                            className="window__mainWindow__content__eventMark correspondenceEvent_border_color">Correspondence
                            event</div>
                    );
                    break;
                default:
                    view = null
            }
        }
        return view
    };

    handleDeleteButtonClick = (id) => {

        if (deleteEvent(id)) {
            // eventModel.deleteById(id);
            eventModel.isPresent = false
        }
    };

    render() {
        eventModel.filter();
        eventModel.formDayEvents(parseInt(this.state.date.toString().slice(8, 10)));
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
                                {event.timestamp.slice(10, 16)}
                            </p>
                        </div>

                        <div className="window__mainWindow__content">
                            <div className="window__mainWindow__content__headline">
                                {event.title}
                            </div>
                            <div className="window__mainWindow__content__description">
                                {event.description}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/timePin.svg")} alt="timePin"
                                     className="timePin"/> {event.timestamp}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/locationPin.svg")} alt="locationPin"
                                     className="locationPin"/>
                                {event.location}
                            </div>
                            <div className="window__mainWindow__content__info">
                                <img src={require("../../css/images/emailPin.svg")} alt="emailPin"
                                     className="emailPin"/>
                                {event.contactInfo} ,
                                {event.contactName}
                            </div>
                            <div className="window__mainWindow__content__eventMark_container">
                                {this.getMarks(event)}
                            </div>
                            <div className="window__mainWindow__content__buttons">
                                <button className="window__mainWindow__content__buttons__edit">
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
                                <div className="invited_people_title">Invited people:</div>
                                <div className="invited_people_column">
                                    <div className="invited_people_text">
                                        {event.participants.first_name}
                                        {event.participants.last_name}
                                    </div>
                                    <div className="invited_people_text" style={{marginRight: 10}}>,</div>
                                    <div className="invited_people_text">{event.participants.position}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            )
        }
    }

}

export default DayEvent;