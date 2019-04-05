import React from "react";
import PropTypes from "prop-types";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline"; //

//Components
import NavBar from './NavBar'
import LeftDrawer from './LeftDrawer'
import ClipContainer from './ClipContainer'

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class Home extends React.Component {
  render() {
    // const { classes, theme } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <LeftDrawer />
        <ClipContainer />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
