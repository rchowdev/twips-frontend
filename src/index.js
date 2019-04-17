import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//React Router
import { BrowserRouter as Router} from 'react-router-dom'

//Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

//Reducers
import playlistReducer from './reducers/playlistReducer'
import drawerReducer from './reducers/drawerReducer'
import clipReducer from './reducers/clipReducer'
import userReducer from './reducers/userReducer'

//Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

require('dotenv').config()

const rootReducer = combineReducers({
  userInfo: userReducer,
  playlistInfo: playlistReducer,
  drawerOpen: drawerReducer,
  clipInfo: clipReducer
})

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#512DA8"
    }
  }
});

console.log(theme);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
