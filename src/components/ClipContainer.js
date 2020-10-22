import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

//Material UI
import { GridList, GridListTile, Typography, Divider } from "@material-ui/core";

//Components
import ClipCard from "./ClipCard";
import EditPlaylistForm from "./EditPlaylistForm";

//Actions
import { getTopClips } from "../actions/playlistActions";

//Styles
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	contentHeader: {
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
});

class ClipContainer extends Component {
	componentDidMount() {
		this.props.getTopClips();
	}

	render() {
		const { selectedPlaylist, drawerOpen, classes } = this.props;
		const { name, clips } = selectedPlaylist;

		return (
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: drawerOpen,
				})}
			>
				<div className={classes.contentHeader} />
				<GridList cellHeight={180}>
					<GridListTile
						key="Subheader"
						cols={2}
						style={{ height: "auto" }}
					>
						<Typography variant="h6" inline>
							{name}
						</Typography>
						<EditPlaylistForm />
						<Divider />
					</GridListTile>
					{/* Clips */}
					{clips.map((clipObj) => (
						<ClipCard
							key={clipObj.twitch_tr_id}
							clip={clipObj}
						></ClipCard>
					))}
				</GridList>
			</main>
		);
	}
}

const mapStateToProps = ({ playlistInfo, drawerOpen }) => {
	const { clips, selectedPlaylist } = playlistInfo;
	return { clips, selectedPlaylist, drawerOpen };
};

const mapDispatchToProps = (dispatch) => ({
	getTopClips: () => dispatch(getTopClips()), //Get top clips from twitch using imported getTopClips
});

const ConnectedClipContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ClipContainer);
export default withStyles(styles, { withTheme: true })(ConnectedClipContainer);
