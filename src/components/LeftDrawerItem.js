import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

//Actions
import { showPlaylist } from "../actions/playlistActions"

class LeftDrawerItem extends Component {
  handleSelectPlaylist = () => {
    this.props.showPlaylist(this.props.playlist.id)
  }

  render() {
    const { playlist } = this.props
    return (
      <ListItem button onClick={this.handleSelectPlaylist}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary={playlist.name} />
      </ListItem>
    )
  }
}

export default connect(null, { showPlaylist })(LeftDrawerItem)
