import React, {Component} from 'react';
import "../css/calendar.css";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.height = document.documentElement.clientHeight;
    }

    render() {
        return (
            <div className="wrapper" style={{height: this.height}}>
                <div className="days-table__wkd-bar">
                    <div className="weekdays-bar__wkd">mon</div>
                    <div className="weekdays-bar__wkd">tue</div>
                    <div className="weekdays-bar__wkd">wed</div>
                    <div className="weekdays-bar__wkd">thu</div>
                    <div className="weekdays-bar__wkd">fri</div>
                    <div className="weekdays-bar__day-off">sat</div>
                    <div className="weekdays-bar__day-off">sun</div>
                </div>
                <div className="days-table">
                    <div className="days-table__week">
                        <div className="days-table__day"></div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">1</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">2</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">3</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">4</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">5</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">6</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                    </div>
                    <div className="days-table__week">
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">7</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">8</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">9</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="current">10</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">11</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">12</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">13</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                    </div>
                    <div className="days-table__week">
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">14</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">15</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">16</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">17</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">18</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">19</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">20</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                    </div>
                    <div className="days-table__week">
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">21</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">22</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">23</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">24</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">25</p>
                                </div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">26</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day-off">
                            <button className="days-table__day-off-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">27</p>
                                </div>
                                <div className="days-table__day-btn__busy-circle"></div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                    </div>
                    <div className="days-table__week">
                        <div className="days-table__day">
                            <button className="days-table__day-btn">
                                <div className="days-table__day-btn__text-container">
                                    <p className="text">28</p>
                                </div>
                                <div className="days-table__day-submenu"></div>
                            </button>
                        </div>
                        <div className="days-table__day"></div>
                        <div className="days-table__day"></div>
                        <div className="days-table__day"></div>
                        <div className="days-table__day"></div>
                        <div className="days-table__day-off"></div>
                        <div className="days-table__day-off"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Calendar;
