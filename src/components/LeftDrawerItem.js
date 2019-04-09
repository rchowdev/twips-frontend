import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

//Actions
import { getClips } from "../actions/playlistActions"

//Components
import DeletePlaylistDialog from './DeletePlaylistDialog'

class LeftDrawerItem extends Component {
  handleSelectPlaylist = () => {
    this.props.getClips(this.props.playlist.id)
  }

  render() {
    const { playlist } = this.props
    return (
      <ListItem button onClick={this.handleSelectPlaylist}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <Typography style={{flex: 1}} variant="inherit" noWrap>{playlist.name}</Typography>
        <ListItemIcon>
          <DeletePlaylistDialog playlist={playlist}/>
        </ListItemIcon>
      </ListItem>
    )
  }
}

export default connect(null, { getClips })(LeftDrawerItem)
