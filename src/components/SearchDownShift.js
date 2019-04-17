import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import deburr from "lodash/deburr";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { TWITCH_HEADERS, TWITCH_API } from '../constants'

//Downshift package
import Downshift from "downshift";

//Material UI
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography'

//Styles
import { withStyles } from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator'

//Actions
import { getTopClipsForCategory } from '../actions/playlistActions'

const BootstrapInput = withStyles(theme => ({ // Custom Select Input
  input: {
    color: 'white',
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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
    '&:focus': {
      borderRadius: 4,
      borderColor: 'white'
    },
  },
}))(InputBase);

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: "11vw",
    height: "5vh",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 2,
      width: '35vw',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    }
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  icon: {
    color: "white"
  }
})

//Fetch to twtich search
const searchTwitchAPI = (category, query) => fetch(`${TWITCH_API}/search/${category}?query=${query}`, { headers: TWITCH_HEADERS } )
//Debounce Promise: Used so when user types we don't fetch every on change
const searchTwitchAPIDebounced = AwesomeDebouncePromise(searchTwitchAPI, 500);

class SearchDownshift extends Component {
  state = {
    selectValue: "games", //What category: Categories(Games) or Channels
    searchInput: "",
    suggestions: []
  }

  //Select handler
  handleSelect = name => e => {
    this.setState({ [name]: e.target.value })
  }

  //Input handler: Uses debounce to fetch search twitch api endpoint
  handleChange = name => async e => {
    const { selectValue } = this.state
    this.setState({ [name]: e.target.value, suggestions: [] });
    if (e.target.value.length > 0) {
      const res = await searchTwitchAPIDebounced(selectValue, e.target.value);
      const json = await res.json();
      const queryResults = json[selectValue] ? json[selectValue].map(({ name, box, logo }) => ({ name, image: box ? box.small : logo })) : []
      this.setState({ suggestions: queryResults })
    }
  };

  handleSearchSubmit = value => {
    this.props.getTopClipsForCategory(this.state.selectValue, value)
    this.setState({ selectValue: "games", searchInput: "" })
  };

  //Search Bar render methods
  renderInput(inputProps) {
    const { InputProps, ref, ...other } = inputProps;
    const { classes } = this.props
    return (
      <InputBase
        inputRef={ref}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{
          ...InputProps
        }}
        {...other}
      />
    );
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
    closeMenu
  }){
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.name);

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.name}
        selected={isHighlighted}
        onClick={() => { closeMenu(); this.handleSearchSubmit(suggestion.name)}}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
          height: "6vh"
        }}
      >
        <ListItemIcon>
          <img style={{ height: 62, width: 52 }} src={suggestion.image} alt={suggestion.name}/>
        </ListItemIcon>
        <Typography noWrap>{suggestion.name}</Typography>
      </MenuItem>
    );
  }

  render() {
    const { classes } = this.props
    const { selectValue, searchInput } = this.state
    return (
      <Fragment>
        <FormControl className={classes.formControl} variant="outlined">
          <Select
          native
          classes={{ icon: classes.icon }}
          value={selectValue}
          onChange={this.handleSelect("selectValue")}
          input={
            <BootstrapInput
              name="selectValue"
            />
          }
          >
            <option value={"games"}>Games</option>
            <option value={"channels"}>Channels</option>
          </Select>
        </FormControl>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Downshift id="downshift-simple">
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              closeMenu,
              selectedItem
            }) => (
              <div>
                {this.renderInput({
                  fullWidth: true,
                  InputProps: getInputProps({
                    placeholder: "Search…",
                    onChange: this.handleChange("searchInput"),
                    value: searchInput,
                    name: "searchInput"
                  })
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {this.getSuggestions(inputValue).map((suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          closeMenu,
                          highlightedIndex,
                          selectedItem
                        })
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            )}
          </Downshift>
        </div>
      </Fragment>
    )
  }
}

const ConnectedSearchDownshift = connect(null, { getTopClipsForCategory })(SearchDownshift)
export default withStyles(styles)(ConnectedSearchDownshift)
