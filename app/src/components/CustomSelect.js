import React from 'react';
import Select from 'react-select';
import {userModel} from "../models/UserModel";
import {observer} from "mobx-react";
import { selectModel } from '../models/SelectModel';
import {eventModel} from "../models/EventModel";

@observer
class CustomSelect extends React.Component {

    customStyles = {
        container: () => ({
            minWidth    : '140px',
            marginLeft  : this.props.defaultValue ? '0px' : '10px',
            marginRight : '10px',
            zIndex      : userModel.userEditIsOpen ? 0 : 150,
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
            backgroundColor: state.isSelected ? '#e4e4e4' : '#FFFFFF'
        }),
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.defaultValue ? props.options.find(item => item.value === selectModel.currentView) : [] ,
        };

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        if (this.props.isNewEvent) {
            userModel.selectedUsers = selectedOption;
        }
        if (this.props.isViewSelect) {
            selectModel.currentView = selectedOption.value;
            eventModel.isPresent = false;
        }

    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                style={{ zIndex: userModel.userEditIsOpen ? 0 : 300 }}
                name="form"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                styles={ this.customStyles }
                isMulti={this.props.isMulti}
                placeholder={this.props.placeholder}
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
