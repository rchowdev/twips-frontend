import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

//Components
import { deletePlaylist, getTopClips } from '../actions/playlistActions'

class DeletePlaylistDialog extends Component{
  state = {
    open: false,
  };

  handleClickOpen = (e) => {
    e.stopPropagation()
    this.setState({ open: true });
  };

  handleClose = (e) => {
    e.stopPropagation()
    this.setState({ open: false });
  };

  handleDeleteButton = (e) => {
    e.stopPropagation()
    this.setState({ open: false })
    this.props.deletePlaylist(this.props.playlist.id)
    this.props.getTopClips()
  }

  render(){
    const { playlist } = this.props

    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <DeleteForeverIcon color="error"/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete ${playlist.name} playlist?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently delete this playlist. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteButton} variant="contained" style={{backgroundColor: "red", color:"white"}} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { deletePlaylist, getTopClips })(DeletePlaylistDialog)
