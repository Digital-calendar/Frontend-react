import React from 'react';
import {Redirect} from 'react-router-dom';
import '../../css/day-dropdown-menu.css';
import {observer} from 'mobx-react';
import {monthModel} from "../../models/MonthModel";
import privateImage from '../../css/images/filters/private-filter.svg';
import internalImage from '../../css/images/filters/internal-filter.svg';
import externalImage from '../../css/images/filters/external-filter.svg';
import correspondenceImage from '../../css/images/filters/correspondence-filter.svg';
import {eventModel} from "../../models/EventModel";
import {toJS} from "mobx";


@observer
class DayDropdownMenu extends React.Component {


    constructor(props) {
        super(props);

        monthModel.isCurrentDay(this.props.number);
        this.state = {
            displayMenu: false,
            isRedirect: false,
            isCurrentDay: monthModel.isCurrent,
            isEventsNotPresent: true,
            events: [],
            eventTypeView: [],
            dropDownShift: '',
        };
        eventModel.formDayEvents(this.props.number);
        //key
        this.id = this.props.number + 10;

        //init string date to pass it on click 'add new' button in day drop down menu
        let dayString = this.props.number;
        if ((this.props.number - 10) < 0) {
            dayString = '0' + dayString;
        }
        let monthString = monthModel.monthToDisplay + 1;
        if ((monthModel.monthToDisplay - 9) < 0) {
            monthString = '0' + monthString;
        }
        this.date = monthModel.yearToDisplay + '-' + monthString +  '-' + dayString;

    }


    showDropdownMenu = event => {
        event.preventDefault();
        // if (this.state.events === null) {
        //     eventModel.formDayEvents(this.props.number);
        //     console.log(1);
        //     this.setState({events: eventModel.dayEvents});
        // }
        document.getElementById(this.id.toString()).setAttribute("visibility", "visible");
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
        console.log(this.props.number, toJS(this.state.events));
        // console.log(toJS(eventModel.dayEvents));
    };

    hideDropdownMenu = () => {
        if (!this.state.isRedirect) {
            const menu = document.getElementById(this.id.toString());
            if (menu != null) {
                menu.setAttribute("visibility", "hidden");
                this.setState({displayMenu: false}, () => {
                    document.removeEventListener('click', this.hideDropdownMenu);
                });
            }
        }
    };

    onAddNewClick = () => {
        this.setState({
            isRedirect: true
        });
    };


    componentWillReceiveProps(nextProps) {
        eventModel.formDayEvents(this.props.number);
        this.setState({
            events: eventModel.dayEvents,
            isEventsNotPresent: false
        });
        this.formEventTypeView();
        this.formDropDownMenuShifts();
    }

    formEventTypeView = () => {
        const views = [];
        // console.log(this.props.number, );
        eventModel.dayEvents.forEach(event => {
            if (event.privateEvent) {
                views.push(<img
                    className="day-list-item-filter"
                    src={privateImage}
                    alt="private-filter" />);
            } else {
                switch (event.eventType) {
                    case 'INTERNAL':
                        views.push(<img
                            className="day-list-item-filter"
                            src={internalImage}
                            alt="internal-filter" />);
                        break;
                    case 'EXTERNAL':
                        views.push(<img
                            className="day-list-item-filter"
                            src={externalImage}
                            alt="external-filter" />);
                        break;
                    case 'CORRESPONDENCE':
                        views.push(<img
                            className="day-list-item-filter"
                            src={correspondenceImage}
                            alt="correspondence-filter" />);
                        break;
                    default:
                }
            }
        });
        this.setState({
            eventTypeView: views
        });
        // console.log(this.props.number, views);
    };

    formDropDownMenuShifts = () => {
        let shift = '';
        if (this.props.isNormal) {
            switch (eventModel.dayEvents.length) {
                case 0:
                    shift = '-4%';
                    break;
                case 1:
                    shift = '-9%';
                    break;
                case 2:
                    shift = '-14%';
                    break;
                case 3:
                    shift = '-19%';
                    break;
                default:
                    shift = '-24%';
            }
        } else {
            shift = '-4%';
        }
        this.setState({
            dropDownShift: shift
        })
    };

    render() {

        if (this.state.isRedirect) {
            eventModel.dayToCreate = this.date;
            return <Redirect from='/calendar' to= '/newEvent'/>
        }


        const events = this.state.events;
        const views = this.state.eventTypeView;

        // console.log(v;iews);
        return (
            <div  className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day" : "days-table__day-off"} onClick={this.showDropdownMenu} >
                {/*<div className="cal-wind__auth-bar__employee" onClick={this.showDropdownMenu}>7</div>*/}
                <button
                    className={(this.props.value > 0 && this.props.value < 6) ? "days-table__day-btn" : "days-table__day-off-btn"}
                    // onClick={this.showDropdownMenu}
                >
                    <div className="days-table__day-btn__text-container">
                        <p className={this.state.isCurrentDay ? "current" : "text"}>
                            {this.props.number}
                        </p>
                    </div>
                    { (this.state.events != null && this.state.events.length > 0)
                        ?  <div className="days-table__day-btn__busy-circle"></div>
                        : null
                    }
                    {/*<div className="days-table__day-submenu"></div>*/}
                </button>
                <div id={this.id} className="day-dropdown" style={{ marginTop: this.props.isNormal ? this.state.dropDownShift : "-4%" }}>
                { this.state.displayMenu ?
                        <div className="wrapper2">
                        <ul className="day-list">
                            {
                                events.map((event, index) => {
                                    return  <li className="day-list-item" key={index}>
                                        <div
                                            className="day-list-time"
                                        >
                                            {event.timestamp.substr(11, 16)}
                                        </div>
                                        <div className="day-list-content">
                                            <div
                                                className="day-list-text"
                                            >
                                                {event.title}
                                            </div>
                                            <div className="day-list-filters">
                                                {views[index]}
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                            {/*<li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/* <li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/* <li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/*<li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/*<li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/*<li className="day-list-item">*/}
                            {/*    <div*/}
                            {/*        className="day-list-time"*/}
                            {/*    >*/}
                            {/*        18:30*/}
                            {/*    </div>*/}
                            {/*    <div className="day-list-content">*/}
                            {/*        <div*/}
                            {/*            className="day-list-text"*/}
                            {/*        >*/}
                            {/*            Обсуждение новых проектов*/}
                            {/*            /!*The birthday of hh.ru company in big hall*!/*/}
                            {/*        </div>*/}
                            {/*        <div className="day-list-filters">*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={correspondenceImage}*/}
                            {/*                alt="correspondence-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={externalImage}*/}
                            {/*                alt="external-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={internalImage}*/}
                            {/*                alt="internal-filter" />*/}
                            {/*            <img*/}
                            {/*                className="day-list-item-filter"*/}
                            {/*                src={privateImage}*/}
                            {/*                alt="private-filter" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            <li className="day-list-add-button">
                                <div
                                    className="day-list-add-new-button"
                                    onClick={this.onAddNewClick}
                                >
                                    add new
                                </div>
                            </li>
                        </ul>
                            <div className="day-list-more-details-button">
                                more details...
                            </div>
                        </div>
                    :
                        <></>
                }
                </div>

            </div>

        );
    }
}

export default DayDropdownMenu;
