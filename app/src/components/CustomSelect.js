import React from 'react';
import Select from 'react-select';
import {userModel} from "../models/UserModel";
import {observer} from "mobx-react";
import { selectModel } from '../models/SelectModel';
import {eventModel} from "../models/EventModel";
import dayImage from "../css/images/day.svg";

const imageStyle = {
    width: '12px',
    height: '12px',
    marginRight: '3px'
};

@observer
class CustomSelect extends React.Component {

    customStyles = {
        container: () => ({
            minWidth    : this.props.isViewSelect && selectModel.currentView === "day" ? '100px' : '140px',
            marginLeft  : this.props.defaultValue ? '0px' : '10px',
            marginRight : '10px',
            zIndex      : (userModel.userEditIsOpen || eventModel.isNewEventModalOpen) && this.props.isNewEvent === undefined ? 0 : 150,
            position    : "relative",
            width       : this.props.isNewEvent ? '100%' : '-1'
        }),
        placeholder: () => ({
            fontSize    : '18px',
            textAlign   : 'center',
            fontFamily  : 'Oxygen'
        }),
        dropdownIndicator: () => ({
            ":hover"    : {
                color   : "#F14048"
            }
        }),
        // random code from internet, but it work
        option: (provided, state) => ({
            ...provided,
            color       : '#000000',
            backgroundColor: state.isSelected ? '#e4e4e4' : '#FFFFFF',
            ":hover"    : {
                backgroundColor: "#F2F2F2"
            }
        }),
    };

    constructor(props) {
        super(props);

        const options = eventModel.filters !== null ? this.props.options.filter(item => {
            const value = item.value.toUpperCase();
            let isOption = false;
            eventModel.filters.forEach(filter => {
                if (value === filter) {
                    isOption = true;
                }
            });
            return isOption;
        }) : this.props.options;

        if (eventModel.filters === null) {
            eventModel.filters = ['OWN', 'INTERNAL', 'EXTERNAL', 'CORRESPONDENCE'];
        }

        this.state = {
            selectedOption: props.defaultValue ? props.options.find(item => item.value === selectModel.currentView) : options ,
        };

    }

    handleChange = selectedOption => {
        selectModel.isMoreDetailsClicked = false;
        this.setState({ selectedOption });
        if (this.props.isNewEvent) {
            userModel.selectedUsers = selectedOption;
        }
        if (this.props.isViewSelect) {
            selectModel.currentView = selectedOption.value;
            localStorage.setItem("currentView",JSON.stringify(selectModel.currentView));
            eventModel.isPresent = false;
            selectModel.isMoreDetailsClicked = false;
        }
        if (this.props.isFilter) {
            if (selectedOption !== null) {
                eventModel.filters = selectedOption.map(item => item.value.toUpperCase());
            } else {
                eventModel.filters = [];
            }
            localStorage.setItem("filters",JSON.stringify(eventModel.filters));
            eventModel.isPresent = false;
        }
    };

    render() {
        let selectedOption;
        if (selectModel.isMoreDetailsClicked && this.props.isViewSelect) {
            selectedOption = {value: 'day', label: <div><img style={imageStyle} src={dayImage} alt=""/><span>День</span></div>};
        } else {
            selectedOption  = this.state.selectedOption;
        }

        return (
            <Select
                style={{ zIndex: userModel.userEditIsOpen || eventModel.isNewEventModalOpen ? 0 : 300 }}
                name="form"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                styles={ this.customStyles }
                isMulti={this.props.isMulti}
                placeholder={this.props.placeholder}
                noOptionsMessage={() => this.props.isFilter ? "Нет фильтров" : "Нет групп"}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "#F2F2F2",
                    },
                })}
            />
        );
    }
}

export default CustomSelect;
