import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import Navbar from "./components/NavBar";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import calendar from "./pages/Calendar";
import match from "./pages/match"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8561c5",
      dark: "#482880",
      main: "#673ab7",
    },
    secondary: {
      light: "#5393ff",
      dark: "#2979ff",
      main: "#1c54b2",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/calendar" component={calendar} />
              <Route exact path="/match" component={match} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
