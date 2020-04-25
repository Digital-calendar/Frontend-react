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
        // monthModel.monthToDisplay = monthModel.currentMonth+1;
        monthModel.arrayWeek = this.getNextWeek(new Date());
    }

    getNextWeek = (curr) => {
      let array = []
      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        console.log(first)
        let day = new Date(curr.setDate(first))
        array.push(day)
      }
      
      return array
    }

    handleRightClick = () => 
      monthModel.arrayWeek = this.getNextWeek(monthModel.arrayWeek[monthModel.arrayWeek.length - 1]);
    

      handleLeftClick = () => {
        let d = monthModel.arrayWeek[0]
        monthModel.arrayWeek = this.getNextWeek(new Date(d.setDate(d.getDate()-7)));
      }
      

    render() {
      // if (monthModel.arrayWeek[0].getMonth()+1 < monthModel.monthToDisplay) {
      //   monthModel.arrayWeek = this.getNextWeek(new Date(monthModel.currentYear + "-" + monthModel.monthToDisplay + "-1"))
      // }

        return (
          <div class="main">
    <div class="wkd-bar">
      <div class="events-wind__weekdays-bar__wkd-prev-btn">
        <button class="wkd-bar__prev-btn" onClick={this.handleLeftClick}>
          <img src={require("../../css/images/arrow-left.svg")} alt="arrow-left" />
        </button>
      </div>
      
      {
        monthModel.arrayWeek.map((date, index) => {
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
