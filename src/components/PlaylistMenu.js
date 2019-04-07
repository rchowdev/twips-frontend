import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

//Actions
import { postClip } from '../actions/playlistActions'
import { selectClip } from '../actions/clipActions'

//Material UI
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Styles
import { withStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 50

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2
  }
});

class PlaylistMenu extends Component {
  state = {
    anchorEl: null
  }

  //Selects Clip
  handleIconClick = e => {
    this.props.selectClip(this.props.clip)
    this.setState({ anchorEl: e.target })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  //Posts Clip to Playlist in Backend
  handleCheckBoxChange = playlistID => e => {
    this.props.postClip(playlistID, this.props.clip)
  }

  render() {
    const { anchorEl } = this.state
    const { playlists, classes } = this.props
    const menuOpen = !!anchorEl

    return (
      <div>
        <IconButton
        aria-label="More"
        aria-owns={menuOpen ? 'long-menu' : undefined}
        aria-haspopup="true"
        color="secondary"
        onClick={this.handleIconClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={this.handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 300,
            },
          }}
        >
          {playlists.map(playlist => (
            <MenuItem key={playlist.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={playlist.name}
                    onChange={this.handleCheckBoxChange(playlist.id)}
                  />
                }
                label={playlist.name}
              />
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ clipInfo: { selectedClip }, playlistInfo: { playlists } }) => {
  return ({ playlists, selectedClip })
}

PlaylistMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConnectedPlaylistMenu = connect(mapStateToProps, { postClip, selectClip })(PlaylistMenu)
export default withStyles(styles)(ConnectedPlaylistMenu)
