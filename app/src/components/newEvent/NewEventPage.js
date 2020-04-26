import React, {Component} from 'react';
import UserBar from '../bar/UserBar';
import NewEvent from "./NewEvent";

class NewEventPage extends Component {

    render() {

        return (
          <div>
              <UserBar/>
              <NewEvent/>
          </div>
        );

    }

}

export default NewEventPage;
