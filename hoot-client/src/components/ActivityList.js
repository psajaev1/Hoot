import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// Redux stuff
import { connect } from 'react-redux';
import PropTypes from "prop-types";

function ActivityList(props) {
    const { activities } = props;
    console.log('todays activities: ', activities);

    // const deleteActivity = (i) => {
    //     // Get key of activity in firebase
    //    const activityKey = Object.keys(activities)[i];
    //    // Connect to our firebase API
    //    const emptyActivity = {
    //         date: null,
    //         duration: null,
    //         type: null,
    //         name: null,
    //    };

    //    props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

    // }

    return (
        <>
            {
                activities === 'not set' || activities === null || activities === undefined || activities.length === 0
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(activities).map((activity, i) => {
                                    let { name, time, duration } = activity;
                                    let hour = parseInt(time.substring(0, 2));
                                    if (hour < 12) {
                                        if (hour === 0) {
                                            time = time.substring(2);
                                            time = '12' + time;
                                        }
                                        time += ' am';
                                    } else if (hour === 12) {
                                        time += ' pm';
                                    } else {
                                        hour -= 12;
                                        let hourStr = hour.toString();
                                        if (hourStr.length < 2) {
                                            hourStr = '0' + hourStr;
                                        }

                                        time = time.substring(2);
                                        time = hourStr + time;
                                        time += ' pm';
                                    }

                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{time}</TableCell>
                                            <TableCell>{duration}</TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    // onClick={e => deleteActivity(i)}
                                                />
                                                <EditIcon
                                                    // onClick={e => editActivity(activity, i)}
                                                    style={{marginLeft:"20px"}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

ActivityList.propTypes = {
    user: PropTypes.object
}
  
const mapStateToProps = (state) => ({
    activities: state.user.todaysActivities,
});

const mapActionsToProps = {
    
};

// export default ActivityList;
export default connect(mapStateToProps, mapActionsToProps)(ActivityList);