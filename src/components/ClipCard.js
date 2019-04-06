import React from 'react'
import { connect } from 'react-redux'

//Material UI
import { GridListTile, GridListTileBar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

//Actions
import { postClip } from '../actions/playlistActions'

//Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridTile: {
    padding: '8px',
    width: "32vw"
  }
})

const ClipCard = (props) => {
  const { classes } = props
  const { title, thumbnail, broadcaster } = props.clip
  const handleAddToPlaylist = () => {
    props.postClip(props.clip)
  }

  return (
    <GridListTile className={classes.gridTile}>
      <img src={thumbnail} alt={title} />
      <GridListTileBar
        title={title}
        subtitle={<span>{broadcaster}</span>}
        actionIcon={
          <IconButton className={classes.icon} onClick={handleAddToPlaylist}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  )
}

const ConnectedClipCard = connect(null, { postClip })(ClipCard)
export default withStyles(styles, { withTheme: true })(ConnectedClipCard)
