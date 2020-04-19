import React, { Component } from "react";
import "../../css/calendar.css";
import {monthModel} from "../../models/MonthModel";

class Day extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        monthModel.isCurrentDay(this.props.number);

        return (
                <div className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day" : "days-table__day-off"}>
                    { this.props.number ?
                        <button
                            className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day-btn" : "days-table__day-off-btn"}>
                            <div className="days-table__day-btn__text-container">
                                <p className={monthModel.isCurrent ? "current" : "text"}>
                                    {this.props.number}
                                </p>
                            </div>
                            <div className="days-table__day-btn__busy-circle"></div>
                            <div className="days-table__day-submenu"></div>
                        </button>
                        : null
                    }
                </div>
        );
    }

}

export default Day;
