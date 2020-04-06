import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';

class Bar extends Component {
    render() {
        return (
          <div>
              <UserBar />
              <MenuBar />
          </div>
        );
    }
}

export default Bar;
