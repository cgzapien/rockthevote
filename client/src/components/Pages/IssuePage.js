import React, { useContext } from "react";
import AddIssueForm from "../forms/AddIssueForm";

import { UserContext } from "../../context/UserProvider";

//import IssueList from "../Issue";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoodIcon from '@mui/icons-material/Mood';
import { Button, Typography } from "@mui/material";

export default function IssuePage(){
  const { issues, deleteIssue } = useContext(UserContext)
  
  return (
    <div className="issuePage">
      <AddIssueForm/>
      <Typography variant="h4" style={{textAlign: "center"}}>Here is a list of your submitted issues.</Typography>  
      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Issue Title</TableCell>
            <TableCell align="center">likes <MoodIcon/> </TableCell>
            <TableCell align="center" >dislikes <SentimentVeryDissatisfiedIcon/> </TableCell>
            <TableCell align="center" >Delete your submitted Issue <DeleteForeverIcon/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <TableRow
              key={issue._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="issue">{issue.title}</TableCell>
              <TableCell align="center" >{issue.likes}</TableCell>
              <TableCell align="center" >{issue.dislikes}</TableCell>
              <TableCell align="center"  ><Button variant="contained" onClick={() => deleteIssue(issue._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}