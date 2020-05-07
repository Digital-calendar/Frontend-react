import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import {monthModel} from "../../models/MonthModel";
import { selectModel } from '../../models/SelectModel';
import Week from "../calendar_week/Week";
import DayView from "../day_view/DayView"
import {observer} from "mobx-react";
import Calendar from '../calendar/Calendar';
import {loadEvents} from "../../actions/loadEvents";
import {eventModel} from "../../models/EventModel";
import {toJS} from "mobx";

@observer
class Bar extends Component {

    constructor(props) {
        super(props);


    }

    selectView() {

        switch (selectModel.currentView) {
            case 'month':
                return <Calendar/>;
            case 'week':
                return <Week/>;
            case 'day':
                return <DayView/>;
            default:
                break;
        }
    }

    render() {
        monthModel.updateMonthInfo();
        return (
          <div>
              <UserBar />
              <MenuBar />
              {this.selectView()}
          </div>
        );
    }
}

export default Bar;
