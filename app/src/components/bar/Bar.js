import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import Calendar from "../Calendar";

class Bar extends Component {
    render() {
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
