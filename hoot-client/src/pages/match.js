import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Link from "react-router-dom/Link";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
};

class match extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            interest1: "",
            interest2: "",
            occupation: "",
            major: "",
            school: "",
            loading: false,
            errors: {},
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            name: this.state.name,
            interest1: this.state.interest1,
            interest2: this.state.interest2,
            occupation: this.state.occupation,
            major: this.state.major,
            school: this.state.school
        };
        axios
            .post("/match", newUserData)
            .then((res) => {
                localStorage.setItem("FBIdToken", "Bearer ${res.data.token}");
                this.setState({
                    loading: false,
                });
                this.props.history.push("/");
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    loading: false,
                });
            });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Match with a Mentor
          </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            type="name"
                            label="Name"
                            className={classes.TextField}
                            helperText={errors.name}
                            error={errors.name ? true : false}
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="interest1"
                            name="interest1"
                            type="interest1"
                            label="Interest"
                            className={classes.TextField}
                            helperText={errors.interest1}
                            error={errors.interest1 ? true : false}
                            value={this.state.interest1}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="interest2"
                            name="interest2"
                            type="interest2"
                            label="Interest"
                            className={classes.TextField}
                            helperText={errors.interest2}
                            error={errors.interest2 ? true : false}
                            value={this.state.interest2}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="occupation"
                            name="occupation"
                            type="occupation"
                            label="Occupation"
                            className={classes.TextField}
                            helperText={errors.occupation}
                            error={errors.occupation ? true : false}
                            value={this.state.occupation}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="school"
                            name="school"
                            type="school"
                            label="School or University"
                            className={classes.TextField}
                            helperText={errors.school}
                            error={errors.school ? true : false}
                            value={this.state.school}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="major"
                            name="major"
                            type="major"
                            label="Major"
                            className={classes.TextField}
                            helperText={errors.major}
                            error={errors.major ? true : false}
                            value={this.state.major}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            FIND A MATCH
            </Button>
                        <br />
                        <br />
                    </form>
                </Grid>
                <Grid item sm />

            </Grid>
        );
    }
}

match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(match);
