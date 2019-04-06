import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

//Actions
import { postPlaylist } from '../actions/playlistActions'

//Styles
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})

class NewPlaylistForm extends Component {
  state = {
    name: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreatePlaylist = (e) => {
    e.preventDefault()
    this.props.postPlaylist(this.state)
    this.setState({ name: "" })
  }

  render() {
    const { classes } = this.props
    const { name } = this.state
    return (
      <ListItem>
        <form onSubmit={this.handleCreatePlaylist}>
          <TextField
            name="name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={this.handleChange}
          />
          <Button type="submit" color="primary">Create</Button>
        </form>
      </ListItem>
    )
  }
}

const ConnectedNewPlaylistForm = connect(null, { postPlaylist })(NewPlaylistForm)
export default withStyles(styles, {withTheme: true})(ConnectedNewPlaylistForm)
