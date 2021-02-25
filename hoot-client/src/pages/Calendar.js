import React from 'react';
// import { withFirebase } from '../components/Firebase';
import { withRouter } from 'react-router-dom';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import useStyles from '../config/theme.calendar';

import CalendarComponents from '../components/calendar/Index';

function Calendar(props) {
    let match = useRouteMatch();
  
    const classes = useStyles();
  
    return (
          <div className={classes.root}>
              <CssBaseline />

              <div className={classes.appBarSpacer} />
              <Container maxWidth="xl" className={classes.container}>
                  <h1>Calendar</h1>
                  
                  <Box pt={4}>
                      <CalendarComponents />
                  </Box>
              </Container>
              
            </div>
    );
  };


export default withRouter(Calendar);