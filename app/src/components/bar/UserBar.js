import React, { Component } from 'react';
import '../../css/calendar.css';
import DropdownMenu from "../DropdownMenu";


class UserBar extends Component {

    render() {
        return (
            <div className="cal-wind__authorization-bar">
                <DropdownMenu />
            </div>
        );
    }

}

export default UserBar;
