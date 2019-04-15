import React, { Component } from 'react'
import landingImg from '../../images/landing.jpg'

//Components
import SignUpLoginDialog from './SignUpLoginDialog'

//Styles
const styles = {
    landingBackground: {
      height: "100%",
      width: "100%",
      zIndex: -1,
      position: "absolute"
    }
}

class Landing extends Component{
  render(){
    return (
      <div>
        <img src={landingImg} style={styles.landingBackground} alt="landingImg"/>
        <SignUpLoginDialog></SignUpLoginDialog>
      </div>
    )
  }
}

export default Landing
