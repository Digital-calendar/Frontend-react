import React, {Component} from 'react'
import {eventModel} from "../../models/EventModel";
import {selectModel} from "../../models/SelectModel";

class DayEvents extends Component {
    constructor(props) {
        super(props);
        this.view = []
    }


    getMarks = (event) => {
        let view = [];
        if (event.privateEvent) {
            view.push(
                <img src={require("../../css/images/private-filter.svg")} className="private"
                     alt="private-filter"/>,
                <div className="filter-private-popup">Личное</div>
            );
        } else {
            switch (event.eventType) {
                case "INTERNAL":
                    view.push(
                        <img src={require("../../css/images/internal-filter.svg")} alt="internal"/>,
                        <div className="filter-internal-popup">Внутреннее</div>
                    );
                    break;
                case "EXTERNAL":
                    view.push(
                        <img src={require("../../css/images/external-filter.svg")} alt="external"/>,
                        <div className="filter-external-popup">Внешнее</div>
                    );
                    break;
                case "CORRESPONDENCE":
                    view.push(
                        <img src={require("../../css/images/correspondence-filter.svg")} alt="correspondence"/>,
                        <div className="filter-corresp-popup">Очное</div>
                    );
                    break;
                default:
                    view = []
            }
        }
        if (event.deadlineEvent) {
            view.push(
                <img src={require("../../css/images/deadline-filter.svg")} className="deadline"
                     alt="private-filter"/>,
                <div className="deadline-filter-name">Дедлайн</div>
            );
        }

        return view;
    };

    handleEventClick = (date) => {
        selectModel.dateToShowInDay = new Date(date);
        selectModel.currentView = "day";
        selectModel.isMoreDetailsClicked = true;
        localStorage.setItem("currentView", JSON.stringify(selectModel.currentView));
        localStorage.setItem("dateToShowInDay", JSON.stringify(selectModel.dateToShowInDay));
    };

    render() {

        eventModel.makeDayEvents(this.props.day)
        return (

            <div className="events-table__column">
                <div className="events-table__column_container">

                    {
                        eventModel.dayEvents.map((event, index) => {
                                return <div key={index} className="events-table__column__event"
                                            onClick={() => this.handleEventClick(event.timestamp_begin)}>
                                    <div className="events-table__column__event__text text-style">
                                        {event.title}
                                    </div>
                                    <div className="events-table__column__event__time-and-filters">
                                        <div className="events-table__column__event__time">
                                            {event.timestamp_begin.slice(-5)}
                                        </div>
                                        <div className="filters "
                                            style={{
                                                fontFamily: 'Oxygen, sans-serif',
                                                fontStyle: 'normal',
                                                fontWeight: 'normal',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {this.getMarks(event)}
                                        </div>
                                    </div>
                                </div>

                            }
                        )

                    }
                </div>
            </div>


        );

    }
}

export default DayEvents;
