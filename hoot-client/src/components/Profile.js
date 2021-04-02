import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
//import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/userActions';
import PropTypes from "prop-types";
import defaultLogo from '../../src/images/default.png';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


const firebase = require('firebase/app');
require('firebase/auth');




const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    height: 200,
  },
  content: {
    padding: 0,
    position: "center",
    objectFit: "cover",
  },
};





export class Profile extends Component {
  render() {
    const {
      user: { email, username, imageUrl }
    } = this.props;

    console.log("--------***");
    console.log(this.props);

    return this.props.user.credentials ? (

      <Card >
        <CardContent >
          <Typography
            variant="h5"
          >
            {"Account Information"}
          </Typography>
        </CardContent>
        <CardMedia
          image={defaultLogo}
          title="Profile pic"
          style={styles.image}
        />
        <CardContent >
          <Typography>{"Username: "}</Typography>
          <Typography
            variant="h8"
            color="primary"
          >
            {this.props.user.credentials.username}
          </Typography>
          <br></br>
          <Typography>{"Email: "}</Typography>
          <Typography
            variant="h8"
          >
            {this.props.user.credentials.email}
          </Typography>
        </CardContent>
      </Card>

    ) : <p>Loading... </p>;
  }
}

//export default withStyles(styles)(Profile);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});



export default connect(mapStateToProps)(withStyles(styles)(Profile));
