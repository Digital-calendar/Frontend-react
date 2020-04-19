import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import Calendar from "../calendar/Calendar";
import {monthModel} from "../../models/MonthModel";

class Bar extends Component {
    render() {
        monthModel.updateMonthInfo();

        return (
          <div>
              <UserBar />
              <MenuBar />
              <Calendar/>
          </div>
        );
    }
}

export default Bar;
