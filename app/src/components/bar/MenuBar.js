import React, {Component} from 'react';
import monthImage from '../../css/images/month.png';
import weekImage from '../../css/images/week.svg';
import dayImage from '../../css/images/day.svg';
import CustomSelect from '../CustomSelect';
import {observer} from "mobx-react";
import {eventModel} from "../../models/EventModel";
import MonthSlider from "./sliders/MonthSlider";


const imageStyle = {
    width: '12px',
    height: '12px',
    marginRight: '3px'
};

const filterOptions = [
    {value: 'own', label: 'Own'},
    {value: 'internal', label: 'Internal'},
    {value: 'external', label: 'External'},
    {value: 'Correspondence', label: 'Correspondence'},
];

const viewOptions = [
    {value: 'month', label: <div><img style={imageStyle} src={monthImage} alt=""/><span>Month</span></div>},
    {value: 'week', label: <div><img style={imageStyle} src={weekImage} alt=""/><span>Week</span></div>},
    {value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>Day</span></div>}
];

@observer
class MenuBar extends Component {

    onNewEventClick = () => {
        eventModel.isNewEventModalOpen = true;
    };

    render() {

        return (
            <div className="cal-wind__menu-bar">
                <MonthSlider/>
                <button
                    className="cal-wind__up-bar__new-event-button"
                    onClick={this.onNewEventClick}
                >
                    New Event
                </button>
                <CustomSelect
                    options={filterOptions}
                    name={'filterType'}
                    isMulti={true}
                    placeholder={'Filter'}
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
