import React, {Component} from 'react';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';
import {observer} from "mobx-react";
import {monthModel} from "../../models/MonthModel";
import {Redirect} from 'react-router-dom';
import {eventModel} from "../../models/EventModel";


const imageStyle = {
    width: '12px',
    height: '12px',
    marginRight: '3px'
};

const filterOptions = [
    {value: 'own', label: 'Own'},
    {value: 'internal', label: 'Internal'},
    {value: 'external', label: 'External'},
    {value: 'Correspondence', label: 'Correspondence'},
];

const viewOptions = [
    {value: 'month', label: <div><img style={imageStyle} src={monthImage} alt=""/><span>Month</span></div>},
    {value: 'week', label: <div><img style={imageStyle} src={weekImage} alt=""/><span>Week</span></div>},
    {value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>Day</span></div>}
];

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

@observer
class MenuBar extends Component {

    constructor(props) {
        super(props);

        for (let i = monthModel.currentMonth - 1; i <= monthModel.currentMonth + 2; ++i) {
            monthModel.monthArray.push(i);
        }
        monthModel.yearToDisplay = monthModel.currentYear;

        this.state = {
            isRedirect: false
        }
    }

    onMonthButtonClicked = event => {
        const shiftMonth = parseInt(event.target.getAttribute("id")) - 1;
        monthModel.shiftMonthArray(shiftMonth);
        this.shiftMonthInModel(shiftMonth);
        monthModel.monthToDisplay = monthModel.monthArray[1];

        if ((monthModel.monthArray[0] === 11 && shiftMonth === 1)
            || (monthModel.monthArray[0] === 0 && shiftMonth === 2)
            || (monthModel.monthArray[0] === 11 && shiftMonth === 2)) {
            monthModel.yearToDisplay += 1;
        }
        if (monthModel.monthArray[2] === 0 && shiftMonth < 0) {
            monthModel.yearToDisplay -= 1;
        }

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

    onNewEventClick = () => {
        // this.setState({
        //     isRedirect: true
        // });
        eventModel.isNewEventModalOpen = true;
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect from='/calendar' to='/newEvent'/>
        }


        return (
            <div className="cal-wind__menu-bar">
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
                <button className="cal-wind__up-bar__new-event-button" onClick={this.onNewEventClick}>New Event</button>
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Filter'}
                    isFilter={true}
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
