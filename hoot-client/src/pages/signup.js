import { withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import AppIcon from '../AppLogo.png';

// MUI Stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin : '10px auto 10px auto'
    }, 
    textField : {
        margin: '10px auto 10px auto'
    },
    button : {
        marginTop : 20
    }, 
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    }
};




class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors:{}
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        axios
        .post('/signup', newUserData)
        .then(res => {
            localStorage.setItem('FBIdToken', 'Bearer ${res.data.token}');
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({
                errors: err.response.data,
                loading: false
            });
        });
    }; 
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt ="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        SignUp
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.TextField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange}
                            fullWidth
                            />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.email ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                         <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="handle"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.Handle}
                            error={errors.Handle ? true : false}
                            value={this.state.Handle}
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
                        >SIGNUP</Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}


signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);