import React, { Component } from 'react'

//Material UI
import { GridListTile, GridListTileBar } from '@material-ui/core'

//Components
import PlaylistMenu from './PlaylistMenu'

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

class ClipCard extends Component {
  render() {
    const { classes } = this.props
    const { title, thumbnail, broadcaster } = this.props.clip
    return (
      <GridListTile className={classes.gridTile}>
        <img src={thumbnail} alt={title} />
        <GridListTileBar
        title={title}
        subtitle={<span>{broadcaster}</span>}
        actionIcon={
          <PlaylistMenu clip={this.props.clip}/>
        }
        />
      </GridListTile>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ClipCard)
