import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import AppLogo from '../AppLogo.png';

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'



export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar className="toolbar-container">
                <Button component={Link} to="/"><img src={AppLogo} alt="logo" width='100' /></Button> 
                <Button component={Link} to="/login">Login</Button> 
                <Button component={Link} to="/signup">Signup</Button> 
                <Button component={Link} to="/calendar">Calendar</Button>
                <Button component={Link} to="/match">Find a Mentor</Button> 
                </ToolBar>
            </AppBar>
        )
    }
}

export default NavBar
