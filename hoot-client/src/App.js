import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getUserData, logoutUser } from './redux/actions/userActions';


import Navbar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import calendar from "./pages/Calendar";
import match from "./pages/match"

axios.default.baseURL = 'https://us-central1-senior-design-a1e06.cloudfunctions.net/api';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8561c5",
      dark: "#482880",
      main: "#00ace7",
    },
    secondary: {
      light: "#5393ff",
      dark: "#2979ff",
      main: "#1c54b2",
    },
  },
});

const token = localStorage.FBIdToken;

try {

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = '/login';
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
  }


} catch (Exception) {
  console.log("error");
};



function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <AuthRoute exact path="/calendar" component={calendar}
                // authenticated={authenticated} 
                />
                <AuthRoute exact path="/match" component={match} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
