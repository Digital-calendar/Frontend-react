import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";

class App extends Component {
  render() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Registration}/>
            <Route path='/login' exact={true} component={Login}/>
          </Switch>
        </Router>
    );
  }
}

export default App;