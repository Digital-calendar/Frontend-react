import React, {Component} from "react";
import "../../css/dayView.css";
import {eventModel} from "../../models/EventModel";
import {loadEvents} from "../../actions/loadEvents";
import DayEvent from "./dayEvent";
import {observer} from "mobx-react";

@observer
class DayView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (!eventModel.isPresent) {
            loadEvents();
            eventModel.filter()
        }

        return (
            <div className="window" style={{height: window.innerHeight - 80}}>
                <div className="window__empty"/>
                {<DayEvent date={this.props.date}/>}
                <div className="window__empty"/>
            </div>

        );
    }
}

export default DayView;