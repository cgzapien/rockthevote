import React, { useContext } from "react";

import { UserContext } from "../../context/UserProvider";
import PIssue from "./PIssue";

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodIcon from '@mui/icons-material/Mood';
import { Typography } from "@mui/material";

export default function PublicIssues(){
  const { allIssues } = useContext(UserContext)
  const sortIssues = allIssues.sort((a,b) => b.likes - a.likes)
    
  return (
    <div style={{marginTop: "100px"}}>
      <Typography variant="h4">Here is a list of all submitted issues. Don't forget to vote on the issues we
      are facing in our community.</Typography> 
      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow  >
            <TableCell>Issue Title</TableCell>
            <TableCell align="center">likes <MoodIcon/> </TableCell>
            <TableCell align="center" >dislikes <SentimentVeryDissatisfiedIcon/> </TableCell>
            <TableCell align="center" >Date Created</TableCell>
            {/* <TableCell align="center" >Created by user:</TableCell> */}
          </TableRow>
        </TableHead>
        {sortIssues.map(issue => <PIssue {...issue} key={issue._id} />)}
        {/* <TableBody>
          {allIssues.map((issue) => 
          
          {return (
            <TableRow
              key={issue._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="issue">{issue.title}</TableCell>
              <TableCell align="center" onClick={() => console.log("like")}><Button><ThumbUpOffAltIcon/></Button> {issue.upvote}</TableCell>
              <TableCell align="center"  onClick={() => console.log("dislike")}><Button><ThumbDownOffAltIcon/> </Button> {issue.downvote}</TableCell>
              <TableCell align="center"  >{issue.dateCreated}</TableCell>
              <TableCell align="center"  >user</TableCell>
            </TableRow>
          )}
          )}
        </TableBody> */}
      </Table>
    </TableContainer>
    </div>
  )
}