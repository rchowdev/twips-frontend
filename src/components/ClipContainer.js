import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import { Button, Icon, CssBaseline } from '@material-ui/core'

//Components
import ClipCard from './ClipCard'
import NavBar from './NavBar'

//Actions
import { getTopClips } from '../actions/playlistActions'

class ClipContainer extends Component {

  componentDidMount() {
    this.props.getTopClips()
  }

  render(){
    const { clips, playlist } = this.props
    return (
      <div>
        <h1>Header</h1>
        <Button variant="outlined" color="primary">
          <Icon fontSize="large" color="primary">add_circle</Icon>
          Create Playlist
        </Button>
        <div className="playlist-container">
          {clips.map(clipObj => <ClipCard key={clipObj.tracking_id} clip={clipObj}></ClipCard>)}
        </div>
        <h1>Playlist</h1>
        <div>{playlist.map(clip => <div key={clip.twitch_tr_id} clip={clip}>{clip.title}</div>)}</div>

      </div>
    )
  }
}

const mapStateToProps = ({playlistInfo}) => {
  const { clips, playlist } = playlistInfo
  return { clips, playlist }
}

const mapDispatchToProps = (dispatch) => ({
    getTopClips: () => dispatch(getTopClips()) //Get top clips from twitch using imported getTopClips
  })

export default connect(mapStateToProps, mapDispatchToProps)(ClipContainer)
