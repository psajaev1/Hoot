import React, { useState, useEffect } from 'react';
// import { withFirebase } from '../Firebase';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import TimePicker from 'react-time-picker';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

// Redux stuff
import { connect } from 'react-redux';
import { addUserActivity, getAllUsernames } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function AddActivity(props) {
    const classes = useStyles();

    const theme = useTheme();

    const { selectedDay, currUser } = props;
    let { allUsers } = props;

    allUsers = allUsers.filter(name => name !== currUser)

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.month + 1}-${selectedDay.day}-${selectedDay.year}`;

    // Set default activity object
    const defaultActivity = {
        name: '',
        date: queryDate,
        time: '09:00',
        duration: 60,
        invites: [],
    }

    const [activity, setActivity] = useState(defaultActivity);
    
    useEffect(() => props.getAllUsernames(), []);

    const handleChange = event => {
        const { name, value } = event.target
        setActivity({
            ...activity, 
            date: queryDate,
            [name]: value});
    }

    const handleTimeValue = event => {
        setActivity({
            ...activity, 
            date: queryDate,
            time: event});
    }

    const handleSlider = e => {
        const duration = e.target.getAttribute('aria-valuenow');
        setActivity({...activity, duration: duration});
    }

    const handleInvites = event => {
        setActivity({
            ...activity, 
            invites: event.target.value,
        });
    }

    const isValid = activity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = (event) => {
        // get user from Redux, create activity object from info from this class,
        // then call axios post route with newActivity object to send to FB

        // console.log('submitted time and duration are: ' + activity.time + ', ' + activity.duration)
        console.log('list of invites would have been: ');
        console.log(activity.invites);
        event.preventDefault();
        const newActivity = {
            name: activity.name,
            date: activity.date,
            time: activity.time,
            duration: activity.duration,
            invites: activity.invites,
        };
        props.addUserActivity(newActivity);

        setActivity({
            ...activity,
            name: '',
            invites: [],
        });
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <h3>Add activity on {selectedDay.month + 1}-{selectedDay.day} </h3>
            <FormControl className={classes.formControl}>
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Activity name"
                    value={activity.name}
                    name="name"
                    onChange={handleChange}
                />
                <TimePicker
                    onChange={handleTimeValue}
                    value={activity.time}
                    name={"time"}
                    disableClock
                />
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    defaultValue={activity.duration}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={15}
                    marks
                    min={15}
                    max={180}
                    name="duration"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                />

                <Typography id="user-list" gutterBottom>
                    Select Users to Invite Below
                </Typography>
                <Select
                  labelId="mutiple-chip-label"
                  id="mutiple-chip"
                  aria-labelledby="user-list"
                  multiple
                  value={activity.invites}
                  onChange={handleInvites}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {allUsers.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, activity.invites, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isValid}
            >
            Add activity
            </Button>
        </form>
    )
};

AddActivity.propTypes = {
    addUserActivity: PropTypes.func.isRequired,
}
  
const mapStateToProps = (state) => ({
    currUser: state.user.credentials.username,
    allUsers: state.data.allUsers,
});

const mapActionsToProps = {
    addUserActivity,
    getAllUsernames,
};

export default connect(mapStateToProps, mapActionsToProps)(AddActivity);
// export default AddActivity;
// export default withFirebase(AddActivity);