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
    <Grid component="main" container sx={{height: "100vh"}}>
      <Grid
              item
              xs={false}
              sm={4}
              md={6}
              sx={{
                backgroundImage: `url(https://wallpaperaccess.com/full/285374.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                backgroundPosition: 'fixed',

              }}
          />
        <Grid align="center" component="form" onSubmit={handleSubmit}>
          <Typography variant="h4">Welcome to</Typography>
          <Typography variant="h2">Rock the Vote</Typography>
          {/* <Avatar style={avatarStyle}><LockIcon/></Avatar> */}
          <h2>{formTitle}</h2>
          <TextField 
          required 
          label="username"
          name="username"
          value={username} 
          placeholder="Enter username" 
          variant="outlined"
          onChange={handleChange}/>
          <TextField 
          required 
          type="password"
          label="password"
          name="password"
          value={password} 
          placeholder="Enter password" 
          variant="outlined"
          onChange={handleChange} />
          <Button
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
    </Grid>
  )
}