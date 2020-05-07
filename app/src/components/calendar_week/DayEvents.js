import React, {Component} from 'react'
import {eventModel} from "../../models/EventModel";
import {monthModel} from "../../models/MonthModel";


class DayEvents extends Component {
    constructor(props) {
        super(props);

        this.view = [
            <img src={require("../../css/images/private-filter.svg")} className="private-filter" alt="private-filter"/>,
            <div className="private-filter-name">Private</div>
        ]
    }


    getDayEvents(day) {
        let array = [];
        let dayString = day;
        if ((day - 10) < 0) {
            dayString = '0' + dayString;
        }
        let monthString = monthModel.monthToDisplay + 1;
        if ((monthModel.monthToDisplay - 9) < 0) {
            monthString = '0' + monthString;
        }
        const formatDay = monthModel.yearToDisplay + '-' + monthString + '-' + dayString;

        eventModel.events
            .filter(event => {

                if (event.timestamp.slice(0, 10) === formatDay) {
                    array.push(event);
                }
            });

        return array;
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

    render() {


        return (
            <div className="events-table__column">
                {
                    this.getDayEvents(this.props.day).map((event, index) => {
                            return <div key={index} className="events-table__column__event">
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


        );

    }
}

export default DayEvents;