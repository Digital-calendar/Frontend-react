import React, {Component} from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import {monthModel} from "../../models/MonthModel";
import {selectModel} from '../../models/SelectModel';
import Week from "../calendar_week/Week";
import DayView from "../day_view/DayView"
import {observer} from "mobx-react";
import Calendar from '../calendar/Calendar';
import {Redirect} from 'react-router-dom';
import {userModel} from "../../models/UserModel";


@observer
class Bar extends Component {

    selectView() {
        localStorage.setItem("currentView", JSON.stringify(selectModel.currentView));
        switch (selectModel.currentView) {
            case 'month':
                return <Calendar/>;
            case 'week':
                return <Week/>;
            case 'day':
                return <DayView date={selectModel.dateToShowInDay}/>;
            default:
                break;
        }
    }

    render() {

        if (userModel.user === null) {
            return <Redirect to='/'/>;
        }

        monthModel.updateMonthInfo();

        return (
            <div>
                <UserBar/>
                <MenuBar/>
                {this.selectView()}
            </div>
        );
    }
}

export default Bar;
