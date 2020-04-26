import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import Calendar from "../calendar/Calendar";
import {monthModel} from "../../models/MonthModel";
import NewEvent from "../newEvent/NewEvent";
import {loadUsers} from "../../actions/loadUsers";

class Bar extends Component {
    render() {
        monthModel.updateMonthInfo();

        loadUsers();
        return (
          <div>
              <UserBar />
              <MenuBar />
              <Calendar/>
              {/*<NewEvent />*/}
          </div>
        );
    }
}

export default Bar;
