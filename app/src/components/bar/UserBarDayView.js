import React, {Component} from "react";
import {monthModel} from "../../models/MonthModel";
import {toJS} from "mobx";
import {observer} from "mobx-react";
import {selectModel} from "../../models/SelectModel";

const _ = require('lodash');

@observer
class UserBarDayView extends Component {
    constructor(prop) {
        super(prop);
        if (selectModel.dateToShowInDay === null) {
            monthModel.getWeekForDayView(new Date(monthModel.yearToDisplay, monthModel.monthToDisplay, monthModel.currentDay));
        } else {
            monthModel.getWeekForDayView(selectModel.dateToShowInDay)
        }

    }

    onDayClick = (day) => {
        monthModel.getWeekForDayView(day);
        selectModel.dateToShowInDay = monthModel.dayArray[3]

    };

    render() {
        return (

            <div className="cal-wind__menu-bar__month-view">
                {
                    monthModel.dayArray.map((date, index) => {
                        if (_.isEqual(monthModel.dayArray[3], date)) {
                            return <button id = "${index}" className="cal-wind__menu-bar__button-month_selected" >
                                {date.toString().slice(0, 3) + " " + date.toString().slice(8, 10)}
                            </button>
                        } else {
                            return <button id = "${index}" className="cal-wind__menu-bar__button-month" onClick={() => this.onDayClick(date)} >
                                {date.toString().slice(0, 3) + " " + date.toString().slice(8, 10) }
                            </button>
                        }

                    })
                }
            </div>
        );
    }
}

export default UserBarDayView;
