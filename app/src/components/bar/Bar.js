import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import {monthModel} from "../../models/MonthModel";
import { selectModel } from '../../models/SelectModel';
import Week from "../calendar_week/Week";
import {observer} from "mobx-react";
import Calendar from '../calendar/Calendar';

@observer
class Bar extends Component {
    
    selectView() {
        switch (selectModel.currentView) {
            case 'month':
                return <Calendar/>
            case 'week':
                return <Week/>
            case 'day':
                //todo
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
