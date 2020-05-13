import React, {Component} from 'react';
import UserBar from '../bar/UserBar';
import NewEvent from "./NewEvent";
import {eventModel} from "../../models/EventModel";
import {toJS} from "mobx";

class NewEventPage extends Component {

    render() {

        return (
            <div>
                <UserBar/>
                {console.log(123)}
                <NewEvent date={eventModel.dayToCreate} event = {toJS(eventModel.eventForEdit)}/>

            </div>
        );
    }

}

export default NewEventPage;
