import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "../../context/UserProvider"


export default function AddIssueForm() {
  const initInputs = {
    title: "",
    description: ""
  }
  const [ inputs, setInputs ] = useState(initInputs)
  const { addIssue } = useContext(UserContext)

  function handleChange(e){
    const { name, value } = e.target
    setInputs(prevState => ({
      ...prevState, [name]: value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    addIssue(inputs)
    setInputs(initInputs)
  }
  const form ={margin: "75px"}
  const { title, description } = inputs
  return (
    <form style={form}>
      <Box align="center" className="issueBox">
        <Typography variant="h4">
          Submit <u>YOUR</u> Issue here.
        </Typography>
        <br/>  
        <TextField
          required
          name="title"
          value={title}
          label="issue"
          placeholder="post your issue"
          variant="standard"
          onChange={handleChange}
          style={{width: "50%"}}
        ></TextField>
        < br/>
        <br/>
        <TextField
          required
          name="description"
          label="description"
          value={description}
          placeholder="describe it"
          variant="standard"
          onChange={handleChange}
          style={{width: "50%"}}
        ></TextField>
        <br/>
        <br/>
        <Button
          type="submit"
          variant="outlined"
          endIcon={<SendIcon/>}
          onClick={handleSubmit}
        >Submit Issue</Button>
      </Box>
    </form>
  )
}