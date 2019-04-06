import React, { Component }from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

//Material UI
import Collapse from "@material-ui/core/Collapse"
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography"
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import AddIcon from "@material-ui/icons/Add"

//Components
import NewPlaylistForm from './NewPlaylistForm'
import LeftDrawerItem from './LeftDrawerItem'

//Actions
import { getPlaylists } from '../actions/playlistActions'

//Styles
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  }
})

class LeftDrawer extends Component{
  state = {
    collapseIsOpen: false
  }

  //Load playlists
  componentDidMount(){
    this.props.getPlaylists()
  }

  handleCollapse = () => {
    this.setState({collapseIsOpen: !this.state.collapseIsOpen})
  }

  render(){
    const { open, playlists, classes } = this.props
    const { collapseIsOpen } = this.state

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}/>
        <List>
          <ListItem divider>
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <Typography variant="title">Playlists</Typography>
          </ListItem>
          {/*Playlists names here*/}
          {playlists.map(playlist => (
            <LeftDrawerItem key={playlist.id} playlist={playlist} />
          ))}
          {/*Create Playlist Form*/}
          <ListItem button onClick={this.handleCollapse}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Playlist"} />
          </ListItem>
          <Collapse in={collapseIsOpen} timeout="auto" unmountOnExit>
            <NewPlaylistForm />
          </Collapse>
        </List>
      </Drawer>
    )
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = ({ open, playlistInfo }) => {
    const { playlists } = playlistInfo
    return { open, playlists }
}

const ConnectedLeftDrawer = connect(mapStateToProps, { getPlaylists })(LeftDrawer)
export default withStyles(styles, { withTheme: true })(ConnectedLeftDrawer)
