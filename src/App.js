import React, { Component } from 'react';
import './App.css';

//React Router
import { Route, Switch, withRouter } from 'react-router-dom'

import NavDrawer from './components/NavDrawer'
import ClipContainer from './components/ClipContainer'

class App extends Component {
  render() {
    return (
      <div>
        <NavDrawer />
        <Switch>
          <Route path="/" component={ClipContainer}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
