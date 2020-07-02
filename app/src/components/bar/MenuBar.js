import React, {Component} from 'react';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';
import {observer} from "mobx-react";
import {eventModel} from "../../models/EventModel";
import MonthSlider from "./sliders/MonthSlider";
import {selectModel} from "../../models/SelectModel";
import UserBarDayView from "./UserBarDayView";

const imageStyle = {
    width: '12px',
    height: '12px',
    marginRight: '3px'
};

const filterOptions = [
    {value: 'own', label: 'Личные'},
    {value: 'internal', label: 'Внутренние'},
    {value: 'external', label: 'Внешние'},
    {value: 'Correspondence', label: 'Очные'},
];

const viewOptions = [
    {value: 'month', label: <div><img style={imageStyle} src={monthImage} alt=""/><span>Месяц</span></div>},
    {value: 'week', label: <div><img style={imageStyle} src={weekImage} alt=""/><span>Неделя</span></div>},
    {value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>День</span></div>}
];

@observer
class MenuBar extends Component {

    onNewEventClick = () => {
        eventModel.isNewEventModalOpen = true;
    };

    render() {

        return (
            <div className="cal-wind__menu-bar">
                {selectModel.currentView === "day" ? <UserBarDayView/> : <MonthSlider/>}
                <button
                    className="cal-wind__up-bar__new-event-button"
                    onClick={this.onNewEventClick}
                >
                    Создать событие
                </button>
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Фильтр'}
                    isFilter={true}
                />
                <CustomSelect
                    options={viewOptions}
                    isMulti={false}
                    defaultValue={true}
                    isViewSelect={true}
                />
            </div>
        );
    }

}

export default MenuBar;
