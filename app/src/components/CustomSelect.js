import React from 'react';
import Select from 'react-select';

class CustomSelect extends React.Component {

    customStyles = {
        container: () => ({
            minWidth    : '120px',
            marginLeft  : this.props.defaultValue ? '0px' : '10px',
            marginRight : '10px',
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
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.defaultValue ? props.options[0] : [] ,
        };

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
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