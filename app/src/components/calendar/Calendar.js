import React, {Component} from 'react';
import "../../css/calendar.css";
import {monthModel} from "../../models/MonthModel";
import {observer} from "mobx-react";
import Day from "./Day";
import DayDropdownMenu from "./DayDropdownMenu";
import {eventModel} from "../../models/EventModel";
import {loadEvents} from "../../actions/loadEvents";

@observer
class Calendar extends Component {


    constructor(props) {
        super(props);


        this.arrayWeek = [1, 2, 3, 4, 5, 6, 7];
        this.arrayMonth = [];
        this.height = document.documentElement.clientHeight;
        eventModel.isPresent = false;
        loadEvents();
        eventModel.filter();
    }

    formMonthArray = () => {
        const newArray = [];
        for (let i = 1; i <= monthModel.monthWeekAmount; ++i) {
            newArray.push(i);
        }
        if (monthModel.monthWeekAmount === 4) {
            newArray.push(5);
        }
        this.arrayMonth = newArray;
    };



    render() {

        this.formMonthArray();

        if (!eventModel.isPresent) {
            console.log(123);
            loadEvents();
            eventModel.filter();
        }

        return (
            <div className="wrapper" style={{height: this.height}}>
                <div className="days-table__wkd-bar">
                    <div className="weekdays-bar__wkd">mon</div>
                    <div className="weekdays-bar__wkd">tue</div>
                    <div className="weekdays-bar__wkd">wed</div>
                    <div className="weekdays-bar__wkd">thu</div>
                    <div className="weekdays-bar__wkd">fri</div>
                    <div className="weekdays-bar__day-off">sat</div>
                    <div className="weekdays-bar__day-off">sun</div>
                </div>
                <div className="days-table">
                    {
                        this.arrayMonth.map(week => {
                            return <div key={week} className="days-table__week">
                                {
                                    this.arrayWeek.map(value => {
                                        const day = value + ((week - 1) * 7) - monthModel.monthStartWeekDay + 1;
                                        if ((week === 1 && value < monthModel.monthStartWeekDay)
                                            || (week === monthModel.monthWeekAmount && value > monthModel.monthEndWeekDay)) {
                                            return <Day key={day} value={value}/>;
                                        } else {
                                            if (week > monthModel.monthWeekAmount) {
                                                return <Day key={day} value={value}/>;
                                            } else {
                                                return <DayDropdownMenu events={eventModel.events} isNormal={(week > 3)} isCurrent={false} key={day} number={day} value={value}/>;
                                            }
                                        }

                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Calendar;
