import React, { useState } from 'react';
// import { withFirebase } from '../Firebase';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import PropTypes from "prop-types";

// Redux stuff
import { connect } from 'react-redux';
import { addUserActivity } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function AddActivity(props) {
    const classes = useStyles();

    const { selectedDay } = props;
    // const uid = authUser.uid;

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.month + 1}-${selectedDay.day}-${selectedDay.year}`;

    // Set default activity object
    const defaultActivity = {
        name: '',
        // type: 1,
        duration: 60,
        date: queryDate
    }

    const [activity, setActivity] = useState(defaultActivity);

    const handleChange = event => {
        const { name, value } = event.target
        setActivity({
            ...activity, 
            date: queryDate,
            [name]: value});
    }

    // const handleSlider = e => {
    //     const duration = e.target.getAttribute('aria-valuenow');
    //     setActivity({...activity, duration: duration});
    // }

    const isValid = activity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = (event) => {
        // get user from Redux, create activity object from info from this class,
        // then call axios post route with newActivity object to send to FB

        event.preventDefault();
        const newActivity = {
            name: activity.name,
            date: activity.date,
        };
        props.addUserActivity(newActivity);

        // if (authUser) {
        //     firebase.addActivity(uid, activity);
        //     setActivity(defaultActivity);
        //     // Show notification
        //     setOpenSnackbar(true);
        //     setSnackbarMsg('Added activity');
        //     setTimeout(() => {
        //         setOpenSnackbar(false)
        //     }, 3000)
        // }
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
                {/* <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activity.type}
                        style={{minWidth: '100%'}}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Lifting Weights</MenuItem>
                        <MenuItem value={2}>Running</MenuItem>
                        <MenuItem value={3}>Cycling</MenuItem>
                    </Select>
                </div> */}
                {/* <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    defaultValue={activity.duration}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={120}
                    name="duration"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                /> */}
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
    user: state.user,
});

const mapActionsToProps = {
    addUserActivity
};

export default connect(mapStateToProps, mapActionsToProps)(AddActivity);
// export default AddActivity;
// export default withFirebase(AddActivity);