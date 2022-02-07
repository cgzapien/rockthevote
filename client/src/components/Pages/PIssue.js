import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext  } from "../../context/UserProvider";

import TableBody from '@mui/material/TableBody';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

export default function PIssue(props){
  const { addLikeToIssue, addDislikeToIssue, user: {_id} } = useContext(UserContext)
  const { title, likes, dislikes, dateCreated, votedUser } = props
  const [newLikes, setNewLikes ] = useState(likes)
  const [newDislike, setNewDislike] = useState(dislikes)
  const [hasVoted, setHasVoted] = useState(false)
  const [usersWhoHaveVoted, setUsersWhoHaveVoted] = useState(votedUser)
  console.log('usersWhoHaveVoted: ', usersWhoHaveVoted);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const date = new Date(dateCreated)
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const dateIssueCreated = `${monthNames[month]} ${day}, ${year}`
  function AuthVoterLike(){
    if(votedUser.includes(_id)) {
      alert("you already voted on that issue");
    } else {
      addLike(props._id)
    }
  }
  function AuthVoterDislike(){
    if(votedUser.includes(_id)) {
      alert("you already voted on that issue");
    } else {
      addDislike(props._id)
    }
  }

  function addLike(id){
    console.log('id: ', id);
    setNewLikes(prevCount => prevCount + 1)
    addLikeToIssue(id)
    setHasVoted(preStatus => !preStatus)
    setUsersWhoHaveVoted(prevState => [...prevState, _id])
  }
  function addDislike(id){
    setNewDislike(prevCount => prevCount + 1)
    addDislikeToIssue(id)
    setHasVoted(preStatus => !preStatus)
  }
  return (
    <TableBody>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="issue"><Link to={`/issuedetails/${props._id}`} style={{textDecoration: "underline", color: "black"}}>{title} </Link></TableCell>
        <TableCell align="center" ><Button  disabled={hasVoted} onClick={() => AuthVoterLike() } ><ThumbUpOffAltIcon/></Button> {newLikes} </TableCell>
        <TableCell align="center"  ><Button disabled={hasVoted} onClick={() => AuthVoterDislike() }><ThumbDownOffAltIcon/> </Button> {newDislike} </TableCell>
        <TableCell align="center" > {dateIssueCreated}</TableCell>
        {/* <TableCell align="center" >{user}</TableCell> */}
      </TableRow>
    </TableBody>
  )
}

//() => addLike(props._id)

