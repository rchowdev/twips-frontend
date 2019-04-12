import React, { Component } from 'react'

//Material UI
import Button from "@material-ui/core/Button";

//Components
import SignUpLoginDialog from './SignUpLoginDialog'

class Landing extends Component{
  render(){
    return (
      <div>
        <h1>Landing</h1>
        <SignUpLoginDialog></SignUpLoginDialog>
      </div>
    )
  }
}

export default Landing
