import React, { Component } from 'react'

//Material UI
import { GridListTile,
    Card,
    CardHeader,
    CardMedia,
} from '@material-ui/core'


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
    width: "32.3vw"
  },
  title: {
    width: "23vw",
  },
  media: {
    width:'31vw',
    height:'30vh',
    frameborder:'0',
    scrolling:'no'
  }
})

class ClipCard extends Component {
  componentDidMount(){
    const iframe = document.getElementById(this.props.clip.twitch_tr_id)
    iframe.setAttribute("allowfullscreen", "true") //Lets iframe have fullscreen button
    iframe.setAttribute("src", `${this.props.clip.embed_url}&autoplay=false`)
  }

  render() {
    const { classes } = this.props
    const { title, broadcaster, twitch_tr_id } = this.props.clip
    return (
      <GridListTile className={classes.gridTile}>
        <Card>
          <CardHeader
            title={title}
            titleTypographyProps={{ variant: "subtitle1", noWrap: true }}
            subheader={broadcaster}
            action={
              <PlaylistMenu clip={this.props.clip}/>
            }
            classes={{ title: classes.title }}
          />
          <CardMedia
            id={twitch_tr_id}
            className={classes.media}
            component="iframe"
          />
        </Card>
      </GridListTile>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ClipCard)

// <img src={thumbnail} alt={title} />
// <GridListTileBar
// title={title}
// subtitle={<span>{broadcaster}</span>}
// actionIcon={
//   <PlaylistMenu clip={this.props.clip}/>
// }
// />
