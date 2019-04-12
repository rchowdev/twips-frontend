import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//Material UI
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Actions
import { postUser } from '../../actions/userActions'

//Styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  hide: {
    display: "none"
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {}
});

class SignUpLoginDialog extends Component {
  state = {
    open: false,
    value: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  handleClickOpen = (form) => {
    this.setState({ open: true, value: form === "signup" ? 1 : 0 });  //Choose tab based on which button clicked
  };

  handleClose = () => {
    this.setState({ open: false, first_name: "", last_name: "", email: "", password: "" });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (e) => {
    const { first_name, last_name, email, password } = this.state
    e.preventDefault()
    if(this.state.value){ //SIGN UP
      this.props.postUser({ first_name, last_name, email, password })
        .then(res => this.props.history.push("/home"))
    }
    // } else {  //LOGIN
    //   console.log({ email, password })
    // }
    this.setState({ open: false })
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const { classes } = this.props
    const { value, open, first_name, last_name, email, password } = this.state

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen("login")}>
          Log In
        </Button>
        <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen("signup")}>
          Sign Up
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">{value ? "Sign Up": "Login"}</DialogTitle>
          <DialogContent>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Log In"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Sign Up"
              />
            </Tabs>
            <form id="signup-login" onSubmit={this.handleSubmit}>
              <TextField
                required
                classes={value ? null : { root: classes.hide } }
                margin="dense"
                id="first_name"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
                value={first_name}
              />
              <TextField
                required
                classes={value ? null : { root: classes.hide } }
                margin="dense"
                id="last_name"
                name="last_name"
                label="Last Name"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
                value={last_name}
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                onChange={this.handleInputChange}
                value={email}
              />
              <TextField
                required
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                onChange={this.handleInputChange}
                value={password}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" form="signup-login">
              {value ? "Signup" : "Login"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const ConnectedSignUpLoginDialog = connect(null, { postUser })(SignUpLoginDialog)
export default withRouter(withStyles(styles)(ConnectedSignUpLoginDialog))
