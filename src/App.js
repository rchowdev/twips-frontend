import React, { Component } from 'react';
import './App.css';

//React Router
import { Route, Switch, withRouter } from 'react-router-dom'

import Home from './components/Home'
import Landing from './components/LandingPage/Landing'

class App extends Component {
  componentDidMount(){
    let token = localStorage.token
    token ? //User logged in?
      this.props.history.push("/home")
      : this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
