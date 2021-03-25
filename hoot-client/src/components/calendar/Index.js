import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

import AddActivity from '../AddActivity';
import ActivityList from '../ActivityList';

import PropTypes from "prop-types";

// Redux stuff
import { connect } from 'react-redux';
import { getTodaysActivities, getActiveDays } from '../../redux/actions/userActions';

function Calendar(props) {

    // const {firebase, authUser} = props;
    const { activitiesProp, activeDaysProp } = props;

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


    /*** ACTIVITY LIST ***/
    const [activities, setActivities] = useState([]);
    const [activeDays, setActiveDays] = useState([]);

    const retrieveData = () => {
        let date = `${selectedDay.month + 1}-${selectedDay.day}-${selectedDay.year}`;

        const activitiesPromise = props.getTodaysActivities(date);
        // activitiesPromise.then((data) => {
        //     console.log('activity data: ', data);
        //     setActivities(activities);
        // })
        // console.log('activity data: ', activities);
        // // setActivities(activitiesProp);
        // setActivities(activities);

        retrieveActiveDays();
    };

    const retrieveActiveDays = () => {
        const activeDaysPromise = props.getActiveDays();
        // activeDaysPromise.then((data) => {
        //     console.log('active day data: ', data);
        //     setActiveDays(data);
        // })
        // console.log('active day data: ', actDays);
        // console.log(typeof(actDays));
        // // setActiveDays(activeDaysProp);
        // setActiveDays(actDays);
    };

    useEffect(() => retrieveData(), [selectedDay]);

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
                        //    activeDays={activeDays}
                           setSelectedDay={setSelectedDay}
                           actualMonth={actualMonth}
                           weekdays={weekdays}
                       />
               </Grid>
           </Grid>
 
           <Grid item xs={12} md={4} lg={3}>
               <Paper className="paper">
                   <>
                       {/* <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3> */}
                       <AddActivity
                           selectedDay={selectedDay}
                       />
                   </>
               </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
                <Paper className="paper">
                <h3>Activities on {selectedDay.month + 1}-{selectedDay.day}</h3>
                <ActivityList
                    // activities={activities}
                />
                </Paper>
            </Grid>
        </Grid>

    )

};

Calendar.propTypes = {
    getTodaysActivities: PropTypes.func.isRequired,
    getActiveDays: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    todaysActivities: state.user.todaysActivities,
    activeDaysProp: state.user.activeDays,
});

const mapActionsToProps = {
    getTodaysActivities,
    getActiveDays
};

export default connect(mapStateToProps, mapActionsToProps)(Calendar);