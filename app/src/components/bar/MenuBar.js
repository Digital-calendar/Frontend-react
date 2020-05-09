import React, {Component} from 'react';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';
import {observer} from "mobx-react";
import {monthModel} from "../../models/MonthModel";
import {Redirect} from 'react-router-dom';
import UserBarMonthView from "./UserBarMonthView";
import {selectModel} from "../../models/SelectModel";
import UserBarDayView from "./UserBarDayView";


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

    onNewEventClick = () => {
        this.setState({
            isRedirect: true
        });
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect from='/calendar' to='/newEvent'/>
        }


        return (
            <div className="cal-wind__menu-bar">

                {selectModel.currentView === "day" ? <UserBarDayView/> : <UserBarMonthView/>}

                <button className="cal-wind__up-bar__new-event-button" onClick={this.onNewEventClick}>New Event</button>
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Filter'}
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
