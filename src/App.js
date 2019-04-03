import React, { Component } from 'react';
import './App.css';

//React Router
import { Route, Switch, withRouter } from 'react-router-dom'

import ClipContainer from './components/ClipContainer'

class App extends Component {
  render() {
    return (
      <div>

        <ClipContainer />
      </div>
    );
  }
}

export default App;
