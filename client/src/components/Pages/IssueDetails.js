import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Paper, Typography } from "@mui/material";
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
    userAxios.get(`/api/issue/${issueId}`)
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
    console.log('comment: ', comment);
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
    <div className="issueDetails">
      
      <Paper variant="outlined" style={{marginTop: "200px"}}>
        <Typography variant="h2">Title: {issue.title}</Typography>
        <Typography variant="h3">Likes: {issue.likes}</Typography>
        <Typography variant="h3">Dislikes: {issue.dislikes}</Typography>
      </Paper>
      <CommentsForm id={issueId} setlist={setCommentsList} postComment={postCommentOnIssue}/>
      <Typography variant="h3"><u>Comments:</u></Typography>
      {commentsList === undefined ? 
          "none"
        :
        commentsList.map(comment => <Typography key={comment._id} variant="h4">{comment.comment}</Typography> ) }
    </div>
  )
}