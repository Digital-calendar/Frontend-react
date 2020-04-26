import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";
import Bar from "./components/bar/Bar";
import {observer} from "mobx-react";
import NewEventPage from "./components/newEvent/NewEventPage";

@observer
class App extends Component {
  render() {

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Registration}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/calendar/month' exact component={Bar}/>
                <Route path='/newEvent' exact component={NewEventPage}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
