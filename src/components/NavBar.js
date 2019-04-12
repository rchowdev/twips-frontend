import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
// import classNames from "classnames";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

//Icon Logo
import { cutIcon } from '../icons/cut-icon'

//Actions
import { openDrawer, closeDrawer } from '../actions/drawerActions'
import { logOut } from '../actions/userActions'

//Components
import SearchDownshift from './SearchDownShift'

//Styles
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  }
})

class NavBar extends Component{
  handleDrawerOpen = () => {
    // this.setState({ open: true });
    this.props.openDrawer()
  };

  handleDrawerClose = () => {
    // this.setState({ open: false });
    this.props.closeDrawer()
  };

  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { classes, drawerOpen } = this.props;

    return (
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open/Close drawer"
            onClick={drawerOpen ? this.handleDrawerClose : this.handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <SvgIcon>
            <path d={cutIcon}/>
          </SvgIcon>
          <Typography variant="h6" color="inherit" noWrap>
            Twips
          </Typography>
          <SearchDownshift />
          <Button onClick={this.handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.drawerOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    logOut: () => dispatch(logOut())
  }
}

const ConnectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default withRouter(withStyles(styles, { withTheme: true })(ConnectedNavBar))
