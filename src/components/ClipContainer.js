import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from "classnames"

//Material UI
import { Button, Icon } from '@material-ui/core';

//Components
import ClipCard from './ClipCard'

//Actions
import { getTopClips } from '../actions/playlistActions'

//Styles
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  }
})

class ClipContainer extends Component {

  componentDidMount() {
    this.props.getTopClips()
  }

  render(){
    const { clips, playlist, classes, open } = this.props
    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.contentHeader}/>
        <Button variant="outlined" color="primary">
          <Icon fontSize="large" color="primary">add_circle</Icon>
          Create Playlist
        </Button>
        <div className="playlist-container">
          {clips.map(clipObj => <ClipCard key={clipObj.tracking_id} clip={clipObj}></ClipCard>)}
        </div>
        <h1>Playlist</h1>
        <div>{playlist.map(clip => <div key={clip.twitch_tr_id} clip={clip}>{clip.title}</div>)}</div>
      </main>
    )
  }
}

const mapStateToProps = ({playlistInfo, open}) => {
  const { clips, playlist } = playlistInfo
  return { clips, playlist, open }
}

const mapDispatchToProps = (dispatch) => ({
    getTopClips: () => dispatch(getTopClips()) //Get top clips from twitch using imported getTopClips
  })

const ConnectedClipContainer = connect(mapStateToProps, mapDispatchToProps)(ClipContainer)
export default withStyles(styles, { withTheme: true })(ConnectedClipContainer)
