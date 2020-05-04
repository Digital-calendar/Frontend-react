import React from 'react';
import {Redirect} from 'react-router-dom';
import './day-dropdown-menu.css';
import {userModel} from "../../models/UserModel";
import {observer} from 'mobx-react';
import {monthModel} from "../../models/MonthModel";
import privateImage from '../../css/images/filters/private-filter.svg';
import internalImage from '../../css/images/filters/internal-filter.svg';
import externalImage from '../../css/images/filters/external-filter.svg';
import correspondenceImage from '../../css/images/filters/correspondence-filter.svg';


@observer
class DayDropdownMenu extends React.Component {


    constructor(props) {
        super(props);

        monthModel.isCurrentDay(this.props.number);
        this.state = {
            displayMenu: false,
            isRedirect: false,
            isCurrentDay: monthModel.isCurrent,
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

        console.log(this.state.isCurrent, this.props.number)

        return (
            <div  className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day" : "days-table__day-off"} onClick={this.showDropdownMenu} >
                {/*<div className="cal-wind__auth-bar__employee" onClick={this.showDropdownMenu}>7</div>*/}
                <button
                    className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day-btn" : "days-table__day-off-btn"}
                    // onClick={this.showDropdownMenu}
                >
                    <div className="days-table__day-btn__text-container">
                        <p className={this.state.isCurrentDay ? "current" : "text"}>
                            {this.props.number}
                        </p>
                    </div>
                    <div className="days-table__day-btn__busy-circle"></div>
                    {/*<div className="days-table__day-submenu"></div>*/}
                </button>
                <div id={this.id} className="day-dropdown" style={{ marginTop: this.props.isNormal ? "-27%" : "-4%" }}>
                { this.state.displayMenu ?
                        <div className="wrapper2">
                        <ul className="day-list">
                            <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                             <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                             <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                            <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                            <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                            <li className="day-list-item">
                                <div
                                    className="day-list-time"
                                >
                                    18:30
                                </div>
                                <div className="day-list-content">
                                    <div
                                        className="day-list-text"
                                    >
                                        Обсуждение новых проектов
                                        {/*The birthday of hh.ru company in big hall*/}
                                    </div>
                                    <div className="day-list-filters">
                                        <img
                                            className="day-list-item-filter"
                                            src={correspondenceImage}
                                            alt="correspondence-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={externalImage}
                                            alt="external-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={internalImage}
                                            alt="internal-filter" />
                                        <img
                                            className="day-list-item-filter"
                                            src={privateImage}
                                            alt="private-filter" />
                                    </div>
                                </div>
                            </li>
                            <li className="day-list-add-button">
                                <div
                                    className="day-list-add-new-button"
                                >
                                    add new
                                </div>
                            </li>
                        </ul>
                            <div className="day-list-more-details-button">
                                more details...
                            </div>
                        </div>
                    :
                        <></>
                }
                </div>

            </div>

        );
    }
}

export default DayDropdownMenu;
