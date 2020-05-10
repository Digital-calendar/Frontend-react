import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";
import Bar from "./components/bar/Bar";
import {observer} from "mobx-react";
import NewEventPage from "./components/newEvent/NewEventPage";
import {userModel} from "./models/UserModel";
import UserEdit from "./components/UserEdit";
import Modal from "react-modal";
import {eventModel} from "./models/EventModel";
import NewEvent from "./components/newEvent/NewEvent";
import {monthModel} from "./models/MonthModel";

const customUserEditStyles = {
    content: {
        paddingTop: '6%',
        position: 'static',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '42%',
        minWidth: '590px',
        height: '100%',
    }
};

const customNewEventStyles = {
    content: {
        paddingTop: '6%',
        position: 'static',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '42%',
        minWidth: '590px',
        height: '100%',
    },
};

@observer
class App extends Component {

    constructor(props) {
        super(props);
        userModel.user = JSON.parse(localStorage.getItem("user"));
        eventModel.filters = JSON.parse(localStorage.getItem("filters"));
        monthModel.monthArray = JSON.parse(localStorage.getItem("monthArray"));
        monthModel.relativeToCurrentMonthShift = JSON.parse(localStorage.getItem("relativeToCurrentMonthShift"));
        monthModel.yearToDisplay = JSON.parse(localStorage.getItem("yearToDisplay"));
        monthModel.monthToDisplay = JSON.parse(localStorage.getItem("monthToDisplay"));
    }

    closeUserEditModal() {
        userModel.userEditIsOpen = false;
    }

    closeNewEventModal() {
        eventModel.isNewEventModalOpen = false;
    }

    render() {

        return (
            <div style={{minWidth: '1315px'}}>
                <Modal
                    style={customUserEditStyles}
                    isOpen={userModel.userEditIsOpen}
                    onRequestClose={this.closeUserEditModal}
                >
                    <UserEdit/>
                </Modal>
                <Modal
                    style={customNewEventStyles}
                    isOpen={eventModel.isNewEventModalOpen}
                    onRequestClose={this.closeNewEventModal}
                >
                    <NewEvent date={eventModel.dayToCreate}/>
                </Modal>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/signUp' exact component={Registration}/>
                        <Route path='/newEvent' exact component={NewEventPage}/>
                        <Route path='/calendar' exact component={Bar}/>
                    </Switch>
                </Router>
            </div>
        );
      }
}

export default App;
