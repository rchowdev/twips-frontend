import React, { Component } from 'react'
import { connect } from 'react-redux'

//Actions
import { selectClip } from '../actions/clipActions'

//Material UI
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Components
import PlaylistMenuItem from './PlaylistMenuItem'

const ITEM_HEIGHT = 50

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

  render() {
    const { anchorEl } = this.state
    const { playlists } = this.props
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
          {playlists.map(playlist => <PlaylistMenuItem key={playlist.id} playlist={playlist} />)}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ playlistInfo: { playlists } }) => {
  return ({ playlists })
}

export default connect(mapStateToProps, { selectClip })(PlaylistMenu)
