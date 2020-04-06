import React, { Component } from 'react';
import '../../css/calendar.css';
// import vectors from '../../css/images/3vectors.png';
import DropdownMenu from "../DropdownMenu";


class UserBar extends Component {

    render() {
        return (
            <div className="cal-wind__authorization-bar">
                <DropdownMenu />
                {/*<div className="cal-wind__auth-bar__employee">Employee</div>*/}
                {/*<button className="cal-wind__auth-bar__employee-info-btn">*/}
                {/*    <img src={vectors} alt="three-vectors" id="three-vectors" />*/}
                {/*        <div className="cal-wind__auth-bar__employee-info-btn__submenu">*/}
                {/*            <p className="info">Polina</p>*/}
                {/*            <p className="info">Polina</p>*/}
                {/*            <p className="info">admin</p>*/}
                {/*            <div className="edit-info">edit</div>*/}
                {/*            <div className="sign-out">sign out</div>*/}
                {/*        </div>*/}
                {/*</button>*/}
            </div>
        );
    }

}

export default UserBar;
