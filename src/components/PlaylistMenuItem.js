import React, { Component } from 'react'
import { connect } from 'react-redux'

//Actions
import { postClip, deleteClip } from '../actions/playlistActions'

//Material UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//Constants
import { API_URL, AUTH_HEADERS } from '../constants'

class PlaylistMenuItem extends Component {
  state = {
    clipIsInPlaylist: false
  }

  //When component mounts check if clip is in this playlist
  componentDidMount(){
    const { id } = this.props.playlist
    const { twitch_tr_id } = this.props.selectedClip
    fetch(`${API_URL}/playlists/${id}/clips/${twitch_tr_id}`, {
      method: "GET",
      headers: AUTH_HEADERS()
    })
      .then(res => res.json())
      .then(({ clipIsInPlaylist }) => this.setState({ clipIsInPlaylist }))
  }

  //Posts Clip to Playlist in Backend
  handleCheckBoxChange = playlistID => e => {
    const { clipIsInPlaylist } = this.state

    //If false, change value to true and then post clip
    clipIsInPlaylist ?
      this.props.deleteClip(playlistID, this.props.selectedClip.twitch_tr_id)
      : this.props.postClip(playlistID, this.props.selectedClip)

    this.setState({clipIsInPlaylist: !clipIsInPlaylist})
  }

  render(){
    const { id, name } = this.props.playlist
    const { clipIsInPlaylist } = this.state
    return (
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              checked={clipIsInPlaylist}
              value={name}
              onChange={this.handleCheckBoxChange(id)}
            />
          }
          label={name}
        />
      </MenuItem>
    )
  }
}

const mapStateToProps = ({ clipInfo: { selectedClip } }) => {
  return ({ selectedClip })
}

export default connect(mapStateToProps, { postClip, deleteClip })(PlaylistMenuItem)
