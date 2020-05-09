import React, { Component } from 'react';
import {monthModel} from "../../../models/MonthModel";
import {eventModel} from "../../../models/EventModel";
import {observer} from "mobx-react";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

@observer
class MonthSlider extends Component {

    constructor(props) {
        super(props);

        if (monthModel.monthArray === null) {
            monthModel.monthArray = [];
            for (let i = monthModel.currentMonth - 1; i <= monthModel.currentMonth + 2; ++i) {
                monthModel.monthArray.push(i);
            }
        }

        if (monthModel.relativeToCurrentMonthShift === null) {
            monthModel.relativeToCurrentMonthShift = 0;
        }


        if (monthModel.yearToDisplay === null) {
            monthModel.yearToDisplay = monthModel.currentYear;
        }

        if (monthModel.monthToDisplay === null) {
            monthModel.monthToDisplay = monthModel.currentMonth;
        }

    }

    onMonthButtonClicked = event => {
        const shiftMonth = parseInt(event.target.getAttribute("id")) - 1;
        monthModel.shiftMonthArray(shiftMonth);
        this.shiftMonthInModel(shiftMonth);
        localStorage.setItem("monthArray",JSON.stringify(monthModel.monthArray));
        localStorage.setItem("relativeToCurrentMonthShift",JSON.stringify(monthModel.relativeToCurrentMonthShift));
        monthModel.monthToDisplay = monthModel.monthArray[1];

        if ((monthModel.monthArray[0] === 11 && shiftMonth === 1)
            || (monthModel.monthArray[0] === 0 && shiftMonth === 2)
            || (monthModel.monthArray[0] === 11 && shiftMonth === 2)) {
            monthModel.yearToDisplay += 1;
        }
        if (monthModel.monthArray[2] === 0 && shiftMonth < 0) {
            monthModel.yearToDisplay -= 1;
        }
        localStorage.setItem("yearToDisplay",JSON.stringify(monthModel.yearToDisplay));
        localStorage.setItem("monthToDisplay",JSON.stringify(monthModel.monthToDisplay));

        monthModel.getNextWeek(new Date(monthModel.yearToDisplay + "-" + (monthModel.monthToDisplay + 1).toString() + "-1"))
    };

    shiftMonthInModel = (shiftMonth) => {
        switch (shiftMonth) {
            case 1:
                monthModel.incrementRelative();
                break;
            case 2:
                monthModel.doubleIncrementRelative();
                break;
            case -1:
                monthModel.decrementRelative();
                break;
            default:
        }
        eventModel.isPresent = false;
    };


    render() {
        return <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="cal-wind__menu-bar__button-year">{monthModel.yearToDisplay}</div>
            <button
                id="0"
                className="cal-wind__menu-bar__button-month"
                onClick={this.onMonthButtonClicked}
            >
                {months[monthModel.monthArray[0]]}
            </button>
            <button
                id="1"
                className="cal-wind__menu-bar__button-month_selected"
                onClick={this.onMonthButtonClicked}
            >
                {months[monthModel.monthArray[1]]}
            </button>
            <button
                id="2"
                className="cal-wind__menu-bar__button-month"
                onClick={this.onMonthButtonClicked}
            >
                {months[monthModel.monthArray[2]]}
            </button>
            <button
                id="3"
                className="cal-wind__menu-bar__button-month"
                onClick={this.onMonthButtonClicked}
            >
                {months[monthModel.monthArray[3]]}
            </button>
        </div>
    }

}


export default MonthSlider;
