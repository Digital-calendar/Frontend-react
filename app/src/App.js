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
import {selectModel} from "./models/SelectModel";

const customUserEditStyles = {
    content: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '50%',
        padding: '0'
    }
};

const customNewEventStyles = {
    content: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '50%',
        padding: '0'
    }
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
        if (JSON.parse(localStorage.getItem("currentView")) === null) {
            localStorage.setItem("currentView",JSON.stringify(selectModel.currentView ));
        }
        selectModel.currentView = JSON.parse(localStorage.getItem("currentView"));
        selectModel.dateToShowInDay = new Date(JSON.parse(localStorage.getItem("dateToShowInDay")));
    }

    closeUserEditModal() {
        userModel.userEditIsOpen = false;
    }

    closeNewEventModal() {
        eventModel.isNewEventModalOpen = false;
    }

    render() {

        return (
            <div>
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
                        <Route path='/' exact component={Registration}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/newEvent' exact component={NewEventPage}/>
                        <Route path='/calendar' exact component={Bar}/>
                    </Switch>
                </Router>
            </div>
        );
      }
}

export default App;
