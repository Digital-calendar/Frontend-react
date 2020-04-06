import React, { Component } from 'react';
import '../../css/calendar.css';
// import vectors from '../../css/images/3vectors.png';
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
