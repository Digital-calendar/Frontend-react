import React, { Component } from "react";
import "../../css/week-layout.css";
import {monthModel} from "../../models/MonthModel";
import {observer} from "mobx-react";
import Day from "../calendar/Day";
import moment from "moment";

@observer
class Week extends Component {
    constructor(props) {
        super(props);
        monthModel.monthToDisplay = monthModel.currentMonth;
        this.month = monthModel.currentMonth+1;
        this.year = monthModel.currentYear;
        this.lastWeek = 0;
        this.state = {arrayWeek : this.getWeek(monthModel.currentDay, this.month, this.year)};
    }

    getWeek = (current_day, month, year) => {
      let array = []
      for (let i = 1; i <= 7; i++) {
        let curr = new Date(year.toString() + "-" + month.toString() + "-" + current_day.toString())
        let first = curr.getDate() - curr.getDay() + i 
        let day = new Date(curr.setDate(first))
        if (day.getMonth()+1 > this.month) {
          this.month++;
        }
        if (day.getMonth()+1 < this.month) {
          this.month--;
        }
        if (day.getMonth()+1 === 1) {
          this.month = 1
          this.year++
        }
        array.push(day)
      }
      return array
    }

    // daysInMonth = (month, year) => {
    //   return new Date(year, month, 0).getDate();
    // }

    handleRightClick = () => {
      this.lastWeek = this.state.arrayWeek[1]
      this.setState({arrayWeek : this.getWeek(this.state.arrayWeek[this.state.arrayWeek.length - 1].getDate(), this.month, monthModel.currentYear)})
    }

    handleLeftClick = () => {
      this.setState({arrayWeek : this.getWeek(this.lastWeek.getDate(), this.month, monthModel.currentYear)})
    }

    render() {
      

        return (
          <div class="main">
    <div class="wkd-bar">
      <div class="events-wind__weekdays-bar__wkd-prev-btn">
        <button class="wkd-bar__prev-btn" onClick={this.handleLeftClick}>
          <img src={require("../../css/images/arrow-left.svg")} alt="arrow-left" />
        </button>
      </div>
      
      {
        this.state.arrayWeek.map((date, index) => {
          return <div class="events-wind__weekdays-bar__wkd">
                  <p key={index} class="events-wind__weekdays-bar__wkd-text">{date.toString().slice(0, 10)}</p>
                </div>
        })
    }
      
      <div class="events-wind__weekdays-bar__wkd-next-btn">
        <button className="wkd-bar__next-btn" onClick={this.handleRightClick}>
          <img src={require("../../css/images/arrow-right.svg")} alt="arrow-right" />
        </button>
      </div>
    </div>

    <div class="events-table">
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">11:00</div>
            <div class="filters">
              <img src={require("../../css/images/internal-filter.svg")} alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">18:00</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">19:00</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">11:30</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">14:00</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">09:00</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">12:30</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">17:00</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">16:00</div>
            <div class="filters">
              <img
                src="../images/correspondence-filter.svg"
                alt="correspondence-filter"
              />
              <div class="filter-corresp-popup">Correspondence</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">15:30</div>
            <div class="filters">
              <img src="../images/internal-filter.svg" alt="internal-filter" />
              <div class="filter-internal-popup">Internal event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">11:00</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">10:30</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">12:00</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">14:00</div>
            <div class="filters">
              <img
                src="../images/correspondence-filter.svg"
                alt="correspondence-filter"
              />
              <div class="filter-corresp-popup">Correspondence</div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-table__column">
        <div class="events-table__column__event">
          <div class="events-table__column__event__text">
            test test test test test test test test
          </div>
          <div class="events-table__column__event__time-and-filters">
            <div class="events-table__column__event__time">16:00</div>
            <div class="filters">
              <img src="../images/external-filter.svg" alt="external-filter" />
              <div class="filter-external-popup">External event</div>
              <img
                src="../images/private-filter.svg"
                class="private-filter"
                alt="private-filter"
              />
              <div class="private-filter-name">Private</div>
            </div>
          </div>
        </div>
      </div>
    </div>

</div>
    );
  }

}

export default Week;
