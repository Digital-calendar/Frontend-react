import React, {Component} from 'react';
import UserBar from '../bar/UserBar';
import NewEvent from "./NewEvent";
import {eventModel} from "../../models/EventModel";

class NewEventPage extends Component {

    render() {

        return (
          <div>
              <UserBar/>
              <NewEvent date={eventModel.dayToCreate}/>
          </div>
        );
    }

}

export default NewEventPage;
