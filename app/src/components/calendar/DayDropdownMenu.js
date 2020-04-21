import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './day-dropdown-menu.css';
import {userModel} from "../../models/UserModel";
import {observer} from 'mobx-react';
import {monthModel} from "../../models/MonthModel";
import DropdownMenu from "../DropdownMenu";


@observer
class DayDropdownMenu extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            displayMenu: false,
            isRedirect: false
        };

        this.id = this.props.number + 10;
        // monthModel.isCurrentDay(this.props.number);

    }


    showDropdownMenu = event => {
        event.preventDefault();
        // event.getElementById()
        // const image = document.getElementById("vector-image");
        // if (image) {
        //     image.setAttribute("src", vectorsRed);
        // }
        // console.log(event.target.getElementById("day-dropdown"));//.setAttribute("visibility", "visible");
        document.getElementById(this.id.toString()).setAttribute("visibility", "visible");
        // console.log(1);
        console.log(document.getElementById(this.id.toString()));
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    };

    hideDropdownMenu = event => {
        if (!this.state.isRedirect) {
            // const image = document.getElementById("vector-image");
            //
            // if (image) {
            //     image.setAttribute("src", vectors);
            // }
            //.getElementById("day-dropdown").setAttribute("visibility", "hidden");
            document.getElementById(this.id.toString()).setAttribute("visibility", "hidden");
            console.log(2);
            this.setState({displayMenu: false}, () => {
                document.removeEventListener('click', this.hideDropdownMenu);
            });
        }
    };

    onSignOut = event => {
        userModel.user = null;
        this.setState({isRedirect: true})
    };

    render() {

        if (this.state.isRedirect) {
            return <Redirect to="/login"/>;
        }

        return (
            <div  className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day" : "days-table__day-off"} onClick={this.showDropdownMenu} >
                {/*<div className="cal-wind__auth-bar__employee" onClick={this.showDropdownMenu}>7</div>*/}
                <button
                    className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day-btn" : "days-table__day-off-btn"}
                    // onClick={this.showDropdownMenu}
                >
                    <div className="days-table__day-btn__text-container">
                        <p className={(monthModel.currentMonth === monthModel.monthToDisplay) && (this.props.number === this.currentDay) ? "current" : "text"}>
                            {this.props.number}
                        </p>
                    </div>
                    <div className="days-table__day-btn__busy-circle"></div>
                    {/*<div className="days-table__day-submenu"></div>*/}
                </button>
                <div id={this.id} className="day-dropdown">
                { this.state.displayMenu ?
                        <ul className="day-list">
                            <li className="day-list-item">Vlad<br/>Zybkin</li>
                            <li className="day-list-item" onClick={this.onSignOut}>backend developer</li>
                            <li className="day-list-item"><Link to="/user/edit">edit</Link></li>
                            <li className="day-list-item" onClick={this.onSignOut}>sign out</li>
                        </ul>
                    :
                        <></>
                }
                </div>

            </div>

        );
    }
}

export default DayDropdownMenu;
