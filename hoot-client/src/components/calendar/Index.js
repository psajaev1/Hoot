import React from 'react';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

import AddActivity from '../AddActivity';


function Calendar(props) {

    // const {firebase, authUser} = props;

    const defaultSelectedDay = {
        day: dayjs().format("D"),
        month: dayjs().month()
    }

    /* HOOKS */
    const [dateObject, setdateObject] = React.useState(dayjs());
    const [showMonthTable, setShowMonthTable] = React.useState(false);
    const [selectedDay, setSelected] = React.useState(defaultSelectedDay);

    /*** CALENDAR BODY ***/
    const setSelectedDay = day => {
        setSelected({
            day,
            month: currentMonthNum()
        });
     // Later refresh data
    };

    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => dayjs().format("MMMM");


    const firstDayOfMonth = () => dayjs(dateObject).startOf("month").format("d");


    /* CALENDAR HEAD */
    // const allMonths = dayjs.months();
    const allMonths = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = dayjs(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    /*** ADDING AN ACTIVITY ***/
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState(null);

    return (
        <Grid container spacing={3}>
           <Grid container spacing={3}>
               <Grid item xs={12} md={8} lg={9}>
                       <CalendarHead
                           allMonths={allMonths}
                           currentMonth={currentMonth}
                           currentYear={currentYear}
                           setMonth={setMonth}
                           showMonthTable={showMonthTable}
                           toggleMonthSelect={toggleMonthSelect}
                       />
                       <CalendarBody
                           firstDayOfMonth={firstDayOfMonth}
                           daysInMonth={daysInMonth}
                           currentDay={currentDay}
                           currentMonth={currentMonth}
                           currentMonthNum={currentMonthNum}
                           selectedDay={selectedDay}
                           // activeDays={activeDays}
                           setSelectedDay={setSelectedDay}
                           actualMonth={actualMonth}
                           weekdays={weekdays}
                       />
               </Grid>
           </Grid>
 
           <Grid item xs={12} md={4} lg={3}>
               <Paper className="paper">
                   <>
                       <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                       <AddActivity
                           selectedDay={selectedDay}
                           // authUser={props.authUser}
                           setOpenSnackbar={setOpenSnackbar}
                           setSnackbarMsg={setSnackbarMsg}
                       />
                   </>
               </Paper>
            </Grid>
        </Grid>

    )

};

export default Calendar;