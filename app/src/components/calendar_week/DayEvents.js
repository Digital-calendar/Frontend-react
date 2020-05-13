import React, {Component} from 'react'
import {eventModel} from "../../models/EventModel";
import {selectModel} from "../../models/SelectModel";
import {observer} from "mobx-react";

class DayEvents extends Component {
    constructor(props) {
        super(props);



        this.view = [

        ]
    }


    getMarks = (event) => {
        let view = [];
        if (event.privateEvent) {
            view.push(
                <img src={require("../../css/images/private-filter.svg")} className="private-filter"
                     alt="private-filter"/>,
                <div className="private-filter-name">Private</div>
            );
        } else {
            switch (event.eventType) {
                case "INTERNAL":
                    view.push(
                        <img src={require("../../css/images/internal-filter.svg")} alt="internal-filter"/>,
                        <div className="filter-internal-popup">Internal event</div>
                    );
                    break;
                case "EXTERNAL":
                    view.push(
                        <img src={require("../../css/images/external-filter.svg")} alt="external-filter"/>,
                        <div className="filter-external-popup">External event</div>
                    );
                    break;
                case "CORRESPONDENCE":
                    view.push(
                        <img src={require("../../css/images/correspondence-filter.svg")} alt="correspondence-filter"/>,
                        <div className="filter-corresp-popup">Correspondence</div>
                    );
                    break;
                default:
                    view = []
            }
        }

        return view;
    };

    handleEventClick = (date) => {
        selectModel.dateToShowInDay = new Date(date);
        selectModel.currentView = "day";
        localStorage.setItem("currentView",JSON.stringify(selectModel.currentView));
        localStorage.setItem("dateToShowInDay",JSON.stringify(selectModel.dateToShowInDay));
    };

    render() {


        return (

            <div className="events-table__column">
                <div className="events-table__column_container">

                    {
                        eventModel.getDayEvents(this.props.day).map((event, index) => {
                                return <div key={index} className="events-table__column__event" onClick={() => this.handleEventClick(event.timestamp)}>
                                    <div className="events-table__column__event__text">
                                        {event.title}
                                    </div>
                                    <div className="events-table__column__event__time-and-filters">
                                        <div className="events-table__column__event__time">
                                            {event.timestamp.slice(-5)}
                                        </div>
                                        <div className="filters">
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