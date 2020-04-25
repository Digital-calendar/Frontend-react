import React, { Component } from 'react';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';
import {observer} from "mobx-react";
import {monthModel} from "../../models/MonthModel";

const imageStyle = {
    width       : '12px',
    height      : '12px',
    marginRight : '3px'
};

const filterOptions = [
    { value: 'own', label: 'Own' },
    { value: 'internal', label: 'Internal' },
    { value: 'external', label: 'External' },
    { value: 'Correspondence', label: 'Correspondence' },
];

const viewOptions = [
    { value: 'month', label: <div><img style={imageStyle} src={monthImage} alt=""/><span>Month</span></div> },
    { value: 'week', label: <div><img style={imageStyle} src={weekImage} alt=""/><span>Week</span></div> },
    { value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>Day</span></div>  }
];

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

@observer
class MenuBar extends Component {

    constructor(props) {
        super(props);

        // let array = [];
        for (let i = monthModel.currentMonth - 1; i <= monthModel.currentMonth + 2; ++i) {
            monthModel.monthArray.push(i);
        }

        this.state = {
            // currentDisplayMonth: array,
            currentYear: monthModel.currentYear
        }
    }

    onMonthButtonClicked = event => {
        const shiftMonth = parseInt(event.target.getAttribute("id")) - 1;
        // console.log(shiftMonth);
        // const newDisplayMonth = monthModel.monthArray.map(number => {
        //     const newNumber = number + shiftMonth;
        //     if (newNumber > 11) {
        //         return newNumber - 12;
        //     }
        //     if (newNumber < 0) {
        //         return 12 + newNumber;
        //     }
        //     return newNumber;
        // });
        monthModel.shiftMonthArray(shiftMonth);
        this.shiftMonthInModel(shiftMonth);
        monthModel.monthToDisplay = monthModel.monthArray[1];
        monthModel.getNextWeek(new Date(monthModel.currentYear + "-" + (monthModel.monthToDisplay +1).toString() + "-1"))
        // this.setState( {currentDisplayMonth: newDisplayMonth});
        // monthModel.monthArray = newDisplayMonth;
        // if (this.state.currentDisplayMonth[1] === 11 && shiftMonth > 0) {
        if (monthModel.monthArray[1] === 11 && shiftMonth > 0) {
            this.setState({currentYear: this.state.currentYear + 1});
        }
        // if (this.state.currentDisplayMonth[2] === 0 && shiftMonth < 0) {
        if (monthModel.monthArray[2] === 0 && shiftMonth < 0) {
            this.setState({currentYear: this.state.currentYear - 1});
        }
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
    };

    render() {
        console.log(monthModel.monthArray);

        return (
            <div className="cal-wind__menu-bar">
                <div className="cal-wind__menu-bar__button-year">{this.state.currentYear}</div>
                <button
                    id="0"
                    className="cal-wind__menu-bar__button-month"
                    onClick={this.onMonthButtonClicked}
                >
                    {/*{months[this.state.currentDisplayMonth[0]]}*/}
                    {months[monthModel.monthArray[0]]}
                </button>
                <button
                    id="1"
                    className="cal-wind__menu-bar__button-month_selected"
                    onClick={this.onMonthButtonClicked}
                >
                    {/*{months[this.state.currentDisplayMonth[1]]}*/}
                    {months[monthModel.monthArray[1]]}
                </button>
                <button
                    id="2"
                    className="cal-wind__menu-bar__button-month"
                    onClick={this.onMonthButtonClicked}
                >
                    {/*{months[this.state.currentDisplayMonth[2]]}*/}
                    {months[monthModel.monthArray[2]]}
                </button>
                <button
                    id="3"
                    className="cal-wind__menu-bar__button-month"
                    onClick={this.onMonthButtonClicked}
                >
                    {/*{months[this.state.currentDisplayMonth[3]]}*/}
                    {months[monthModel.monthArray[3]]}
                </button>
                <button className="cal-wind__up-bar__new-event-button">New Event</button>
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Filter'}
                    isViewSelect={false}
                />
                <CustomSelect
                    options={viewOptions}
                    isMulti={false}
                    defaultValue={true}
                    isViewSelect={true}
                />
            </div>
        );
    }

}

export default MenuBar;
