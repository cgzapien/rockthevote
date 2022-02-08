import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import CommentsForm from "../forms/CommentsForm"

const userAxios = axios.create()
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function IssueDetails() {
  const {issueId} = useParams()
  const [issue, setIssue] = useState({})
  const [commentsList, setCommentsList] = useState()

  //---get issue from params---//
  function getIssue(){
    userAxios.get(`${process.env.REACT_APP_APR_URL}/api/issue/${issueId}`)
      .then(res => {setIssue(() => ({...res.data}))})
      .catch(err => console.log(err))
  }
  //---get comments for with issue id---//
  function getComments(){
    userAxios.get(`${process.env.REACT_APP_APR_URL}/api/issues/comments/issue/${issueId}`)
      .then(res => setCommentsList(() => [...res.data]))
      .catch(err => console.log(err))
  }
  //---POST COMMENT ON ISSUE---//
  function postCommentOnIssue(issueId, comment){
    userAxios.post(`${process.env.REACT_APP_APR_URL}/api/issues/comments/${issueId}`, comment)
      .then(res => setCommentsList(prevState => [...prevState, res.data]))
      .catch(err => console.log(err))

  }
  useEffect(() => {
    getIssue()
    getComments()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="issueDetails" style={{textAlign: "center"}}>
      <Box style={{marginTop: "125px"}}>
        <Typography variant="h2">Issue: {issue.title}</Typography>
        <Typography variant="h5">Likes: {issue.likes}</Typography>
        <Typography variant="h5">Dislikes: {issue.dislikes}</Typography>
      </Box>
      <br/>
      <CommentsForm id={issueId} setlist={setCommentsList} postComment={postCommentOnIssue}/>
      <br/>
      <Typography variant="h3"><u>Comments:</u></Typography>
      {commentsList === undefined ? 
          "No comments have been submitted"
        :
        commentsList.map(comment => <Typography key={comment._id} variant="h4">{comment.comment}</Typography> ) }
    </div>
  )
}