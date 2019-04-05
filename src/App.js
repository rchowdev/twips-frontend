import React, { Component } from 'react';
import './App.css';

//React Router
import { Route, Switch, withRouter } from 'react-router-dom'

import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
