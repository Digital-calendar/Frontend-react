import React, { Component } from 'react';
import arrowDown from '../../css/images/Arrow-down.svg';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';

const imageStyle = {
    width       : '12px',
    height      : '12px',
    marginRight : '3px'
};

const filterOptions = [
    { value: 'own', label: 'Owm' },
    { value: 'internal', label: 'Internal' },
    { value: 'external', label: 'External' },
    { value: 'Correspondence', label: 'Correspondence' },
];

const viewOptions = [
    { value: 'month', label: <div><img style={imageStyle} src={monthImage} alt=""/><span>Month</span></div> },
    { value: 'week', label: <div><img style={imageStyle} src={weekImage} alt=""/><span>Week</span></div> },
    { value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>Day</span></div>  }
];

class MenuBar extends Component {

    render() {
        return (
            <div className="cal-wind__menu-bar">
                <button className="cal-wind__menu-bar__button-year">2020
                    <img src={arrowDown} alt="arrow-down" id="arrow-down-year"/>
                        <div className="cal-wind__menu-bar__year-submenu">
                            <p className="year">2019</p>
                            <p className="year">2019</p>
                            <p className="year">2019</p>
                            <p className="year">2019</p>
                            <p className="year">2019</p>
                        </div>
                </button>
                <button className="cal-wind__menu-bar__button-month">February</button>
                <button className="cal-wind__menu-bar__button-month">March</button>
                <button className="cal-wind__menu-bar__button-month">April</button>
                <button className="cal-wind__up-bar__new-event-button">New Event</button>
                {/*<button className="cal-wind__up-bar__filter-btn">*/}
                {/*        <img src={triangleFilter} alt="filter" id="filter"/>Filter*/}
                {/*        <img src={arrowDown} alt="arrow-down-filter" id="arrow-down-filter"/>*/}
                {/*            <div className="cal-wind__up-bar__filter-btn__filter-submenu">*/}
                {/*                <div className="filters">*/}
                {/*                    /!*<button class="filter-private"></button>*!/*/}
                {/*                    /!*<button class="filter-internal"></button>*!/*/}
                {/*                    /!*<button class="filter-external"></button>*!/*/}
                {/*                    /!*<button class="filter-correspondence"></button>*!/*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*</button>*/}
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Filter'}
                />
                {/*<button className="cal-wind__menu-bar__mapping-btn">*/}
                {/*        <img src={month} alt="month" id="month" />Month*/}
                {/*        <img src={arrowDown} alt="arrow-down" id="arrow-down-month"/>*/}
                {/*        <div className="cal-wind__menu-bar__mapping-btn__map-submenu"></div>*/}
                {/*</button>*/}
                <CustomSelect
                    options={viewOptions}
                    isMulti={false}
                    defaultValue={true}
                />
            </div>
        );
    }

}

export default MenuBar;
