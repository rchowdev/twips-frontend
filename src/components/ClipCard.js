import React from 'react'
import { connect } from 'react-redux'

//Actions
import { postClip } from '../actions/playlistActions'

const ClipCard = (props) => {
  const { title } = props.clip

  const handleAddToPlaylist = () => {
    props.postClip(props.clip)
  }

  return (
    <div>
      <div>{title}</div>
      <button onClick={handleAddToPlaylist}>Add to Playlist</button>
    </div>
  )
}

export default connect(null, { postClip })(ClipCard)
