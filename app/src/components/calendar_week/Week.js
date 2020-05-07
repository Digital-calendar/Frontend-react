import React, {Component} from "react";
import "../../css/week-layout.css";
import {monthModel} from "../../models/MonthModel";
import {eventModel} from "../../models/EventModel";
import {observer} from "mobx-react";
import DayEvents from "./DayEvents";
import {loadEvents} from "../../actions/loadEvents";

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
        let d = monthModel.arrayWeek[monthModel.arrayWeek.length - 1];

        monthModel.getNextWeek(new Date(d.setDate(d.getDate() + 1)));

        if (monthModel.arrayWeek[monthModel.arrayWeek.length - 1].getFullYear() > monthModel.yearToDisplay) {
            monthModel.yearToDisplay += 1;
        }

        if (monthModel.arrayWeek[monthModel.arrayWeek.length - 1].getMonth() !== monthModel.monthToDisplay) {
            monthModel.shiftMonthArray(1)
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
        }

        return (
            <div class="main">
                <div class="wkd-bar">
                    <div class="events-wind__weekdays-bar__wkd-prev-btn">
                        <button class="wkd-bar__prev-btn" onClick={this.handleLeftClick}>
                            <img src={require("../../css/images/arrow-left.svg")} alt="arrow-left"/>
                        </button>
                    </div>


                    {

                        monthModel.arrayWeek.map((date, index) => {
                            if (date === new Date(monthModel.currentYear, monthModel.currentMonth, monthModel.currentDay)) {
                                return <div style={{borderBottom: '1px solid red', backgroundColor: '#F2F2F2'}}
                                            class="events-wind__weekdays-bar__wkd">
                                    <p key={index}
                                       class="events-wind__weekdays-bar__wkd-text">{date.toString().slice(0, 10)}</p>
                                </div>
                            } else {
                                return <div class="events-wind__weekdays-bar__wkd">
                                    <p key={index}
                                       class="events-wind__weekdays-bar__wkd-text">{date.toString().slice(0, 10)}</p>
                                </div>
                            }


                        })
                    }

                    <div class="events-wind__weekdays-bar__wkd-next-btn">
                        <button className="wkd-bar__next-btn" onClick={this.handleRightClick}>
                            <img src={require("../../css/images/arrow-right.svg")} alt="arrow-right"/>
                        </button>
                    </div>
                </div>

                <div class="events-table">

                    {
                        monthModel.arrayWeek.map((date, index) => {
                            console.log(date)
                            return <DayEvents key={index} day={date.getDate()}/>
                        })
                    }
                </div>

            </div>
        );
    }

}

export default Week;
