import React from "react";
import { Grid, Avatar, TextField, Button, Typography, Link, Box } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import vote from "/Users/zapien/Desktop/deployed apps/rockthevote/client/src/media/vote.jpg"

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
  return (
    <>
      <Grid component="main" container sx={{height: "100vh"}}>
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${vote})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                backgroundPosition: 'fixed',
              }}
          />
      <Grid item xs={12} sm={8} md={5}elevation={10} textAlign="center">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Box item xs={12} sm={8} md={5} component="form" onSubmit={handleSubmit}>
          <Typography variant="h3">Rock the Vote</Typography>
          <Avatar style={{backgroundColor: "#102B3F", margin: "auto"}} sx={{ width: 26, height: 26 }}>
            <LockIcon fontSize="small"/>
          </Avatar>
          <Typography component="h1"  variant="h4" style={{marginTop: "10px"}}>{formTitle}</Typography>
          <Typography style={{color: 'red'}}>{errMsg}</Typography>
          <TextField
            style={{marginTop: "10px"}}
            required
          
            label="username"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          >
          </TextField>
          <br/>  
          <TextField
            style={{marginTop: "10px"}}
            required
            type="password"
            label="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handleChange}
          >
          </TextField>
          <br/>
          <Button
            style={{marginTop: "10px"}}
            
            type="submit"
            variant="outlined"
            endIcon={<SendIcon/>}>{formBtn}</Button>
          {formTitle === "Sign In" ?
            <Typography style={{marginTop: "10px"}}>Don't have an account?  <Link component="button" onClick={toggleForm}>Click here</Link></Typography>  
            :
            <Typography style={{marginTop: "10px"}}>Already a user? <Link component="button" onClick={toggleForm}>Click here</Link></Typography>
          }
        </Box>
          <Typography variant="body2" color="text.secondary" align="center" >
            Copyright © <Link color="inherit" href="#">
              www.RocktheVote.com
            </Link> {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </>
  )
}