import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from "classnames"

//Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon'

//Actions
import { updatePlaylist } from '../actions/playlistActions'

//Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hide: {
    display: "none"
  }
})

class EditPlaylistForm extends Component {
  state = {
   open: false,
   name: ""
  }

  handleClickOpen = () => {
    this.setState({ open: true, name: this.props.name });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updatePlaylist(this.props.id, this.state.name) //Playlist ID
    this.setState({ name: "", open: false})
  }

  render() {
    const { classes, areSearchResults } = this.props
    const { open } = this.state

    return (
      <Fragment>
        <IconButton style={{marginBottom: "1vh"}} size="small" color="primary" onClick={this.handleClickOpen} className={classNames({ [classes.hide]: areSearchResults })}>
          <Icon size="small">edit_icon</Icon>
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Playlist</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your playlist name here.
            </DialogContentText>
            <form id="playlist-edit" onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button form="playlist-edit" type="submit" color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = ({playlistInfo: { selectedPlaylist: { id, name, areSearchResults } }}) => {
  return { id, name, areSearchResults }
}

const ConnectedEditPlaylistForm = connect(mapStateToProps, { updatePlaylist })(EditPlaylistForm)
export default withStyles(styles)(ConnectedEditPlaylistForm)
