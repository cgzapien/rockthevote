import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider";

import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar({logout}) {
  const { user: {username}} = useContext(UserContext)
  const styles = {
    textDecoration: "none",
    color: "white"
  }
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar >
        <Typography variant="h6" color="inherit" component="div" sx={{m: 2}}>
          <Link style={styles} to="/home">Home</Link> 
        </Typography>
        <Typography variant="h6" color="inherit" component="div" sx={{m: 2}}>
          <Link style={styles} to="/issues">{username}'s Issues</Link> 
        </Typography>
        <Typography variant="h6" color="inherit" component="div" sx={{m: 2}}>
          <Link style={styles} to="/publicissues">Public Issues</Link> 
        </Typography>
        <Typography variant="h6" color="inherit" component="div" sx={{m: 2}}  >
          <Button onClick={logout} style={{color: "white"}} variant="outlined" >Log out <LogoutIcon/></Button>
        </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}