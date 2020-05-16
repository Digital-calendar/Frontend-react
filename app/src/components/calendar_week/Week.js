import React, {Component} from "react";
import "../../css/week-layout.css";
import {monthModel} from "../../models/MonthModel";
import {eventModel} from "../../models/EventModel";
import {observer} from "mobx-react";
import DayEvents from "./DayEvents";
import {loadEvents} from "../../actions/loadEvents";
import {toJS} from "mobx";

const _ = require('lodash');

@observer
class Week extends Component {
    constructor(props) {
        super(props);

        if (monthModel.currentMonth !== monthModel.monthToDisplay) {
            monthModel.getNextWeek(new Date(monthModel.yearToDisplay, monthModel.monthToDisplay, 1));

        } else if (monthModel.arrayWeek.length === 0) {
            monthModel.getNextWeek(new Date(monthModel.yearToDisplay, monthModel.monthToDisplay, monthModel.currentDay));
        }
        this.array = []

    }


    handleRightClick = () => {
        eventModel.isPresent = false;
        let d = monthModel.arrayWeek[monthModel.arrayWeek.length - 1];

        monthModel.getNextWeek(new Date(d.setDate(d.getDate() + 1)));

        if (monthModel.arrayWeek[monthModel.arrayWeek.length - 1].getFullYear() > monthModel.yearToDisplay) {
            monthModel.yearToDisplay += 1;
        }

        if (monthModel.arrayWeek[monthModel.arrayWeek.length - 1].getMonth() !== monthModel.monthToDisplay) {
            monthModel.shiftMonthArray(1);
            monthModel.incrementRelative()

        }
    };

    handleLeftClick = () => {
        let d = monthModel.arrayWeek[0];

        monthModel.getNextWeek(new Date(d.setDate(d.getDate() - 1)));

        if (monthModel.arrayWeek[0].getFullYear() < monthModel.yearToDisplay) {
            monthModel.yearToDisplay -= 1;
        }
        if (monthModel.arrayWeek[0].getMonth() !== monthModel.monthToDisplay) {
            monthModel.shiftMonthArray(-1);
            monthModel.decrementRelative()

        }

    };


    render() {

        if (!eventModel.isPresent) {
            loadEvents();
            eventModel.filter();
            console.log(toJS(eventModel.events));
        }

        return (
            <div className="main" >
                <div className="wkd-bar" >
                    <div className="events-wind__weekdays-bar__wkd-prev-btn">
                        <button className="wkd-bar__prev-btn" onClick={this.handleLeftClick}>
                            <img src={require("../../css/images/arrow-left.svg")} alt="arrow-left"/>
                        </button>
                    </div>


                    {
                        monthModel.arrayWeek.map((date, index) => {
                            if (_.isEqual(date, new Date(monthModel.currentYear, monthModel.currentMonth, monthModel.currentDay))) {
                                return <div key={index} style={{borderBottom: '1px solid red', backgroundColor: '#F2F2F2'}}
                                            className="events-wind__weekdays-bar__wkd">
                                    <p key={index}
                                       className="events-wind__weekdays-bar__wkd-text">
                                        {date.toLocaleString('ru', monthModel.options)}
                                    </p>
                                </div>
                            } else {
                                return <div key={index} className="events-wind__weekdays-bar__wkd">
                                    <p key={index} className="events-wind__weekdays-bar__wkd-text">
                                        {/*{monthModel.getWeekDay(date)} {date.toLocaleString('ru', monthModel.options).slice(0, 6)}*/}
                                        {date.toLocaleString('ru', monthModel.options)}
                                    </p>
                                </div>
                            }


                        })
                    }

                    <div className="events-wind__weekdays-bar__wkd-next-btn">
                        <button className="wkd-bar__next-btn" onClick={this.handleRightClick}>
                            <img src={require("../../css/images/arrow-right.svg")} alt="arrow-right"/>
                        </button>
                    </div>
                </div>

                <div className="events-table" style={{height: window.innerHeight - 115}}>

                    {
                        monthModel.arrayWeek.map((date, index) => {
                            return <DayEvents key={index}  day={date.getDate()}/>
                        })
                    }
                </div>

            </div>
        );
    }

}

export default Week;
