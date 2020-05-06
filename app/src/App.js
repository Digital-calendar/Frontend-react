import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";
import Bar from "./components/bar/Bar";
import {observer} from "mobx-react";
import NewEventPage from "./components/newEvent/NewEventPage";
import {userModel} from "./models/UserModel";

@observer
class App extends Component {

    constructor(props) {
        super(props);
        userModel.user = JSON.parse(localStorage.getItem("user"));

    }


    render() {

        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Registration}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/newEvent' exact component={NewEventPage}/>
                    <Route path='/calendar' exact component={Bar}/>
                </Switch>
            </Router>
        );
      }
}

export default App;
