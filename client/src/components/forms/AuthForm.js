import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@mui/material"

import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';


export default function AuthForm(props) {
  const { 
    formTitle,
    formBtn,
    errMsg, 
    toggleForm, 
    handleSubmit, 
    handleChange,
    inputs: {
      username,
      password
    }
   } = props
  const paperStyle = {padding: 20, height: 350, width: 250, margin: "100px auto"}
  const avatarStyle = {backgroundColor: "blue"}
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} >
        <Grid align="center">
          <Avatar style={avatarStyle}><LockIcon/></Avatar>
          <h2>{formTitle}</h2>
          <TextField 
          required 
          id="outlined-basic" 
          label="username"
          name="username"
          value={username} 
          placeholder="Enter username" 
          variant="outlined"
          onChange={handleChange}/>
          <TextField 
          required 
          id="outlined-basic" 
          label="password"
          name="password"
          value={password} 
          placeholder="Enter password" 
          variant="outlined"
          onChange={handleChange} />
          <Button
          onClick={handleSubmit} 
          type="submit"
          variant="outlined" 
          endIcon={<SendIcon/>}>{formBtn}</Button>
          <Typography style={{color: "red"}}>{ errMsg }</Typography>
          {formTitle === "Sign In" ? 
            <Typography> Don't have an account? 
              <Link 
                component="button" 
                onClick={toggleForm}
                >
                  Sign Up
              </Link>
            </Typography>
          :
            <Typography> Already a member? 
              <Link
                component="button"
                onClick={toggleForm}
                >
              Sign In
              </Link>
            </Typography>
          }
        </Grid>
      </Paper>
    </Grid>
  )
}