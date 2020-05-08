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

const customStyles = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,

    },
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
    }

    closeModal() {
        userModel.userEditIsOpen = false;
    }

    render() {

        return (
            <div>
                <Modal
                    style={customStyles}
                    isOpen={userModel.userEditIsOpen}
                    onRequestClose={this.closeModal}
                >
                    <UserEdit/>
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
