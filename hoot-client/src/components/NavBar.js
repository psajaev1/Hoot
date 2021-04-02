import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import AppLogo from '../AppLogo.png';

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';


export class NavBar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        return (
            <AppBar>
                <ToolBar className="toolbar-container" padding="2">
                <Button component={Link} to="/login">Login</Button> 
                <Button component={Link} to="/signup">Signup</Button>
                <Button component={Link} to="/"><img src={AppLogo} alt="logo" width='120' /></Button> 
                <Button component={Link} to="/calendar">Calendar</Button>
                <Button component={Link} to="/match">Find a Mentor</Button> 
                <Button onClick={this.handleLogout}>Log Out</Button> 
                </ToolBar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    currUser: state.user.credentials.username,
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(NavBar)
