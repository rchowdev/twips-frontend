import React, { Component } from 'react'

class ClipCard extends Component {
  render(){
    const { title } = this.props.clip

    return (
      <div>{title}</div>
    )
  }
}

export default ClipCard
