import React, { useState } from "react";
import { Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function CommentsForm(props){
  const {id, postComment} = props
  const initInput = {
    comment: ""
  }
  const [input, setInput] = useState(initInput)
  const { comment } = input
  function handleChange(e){
    const {name, value} = e.target
    setInput(prevState => ({...prevState, [name]: value})
    )
  }
  function handleSubmit(e){
    e.preventDefault()
    postComment(id,input)
    setInput(() => ({
      comment: ""
    }))
  }
  return (
    <form className="commentsForm" onSubmit={handleSubmit}>
      <TextField
        required
        name="comment"
        value={comment}
        label="comment"
        placeholder="post your comment"
        variant="standard"
        onChange={handleChange}
      >
      </TextField>
      <br/>
      <br/>
      <Button
        type="submit"
        variant="outlined"
        endIcon={<SendIcon/>}
      >Submit Comment</Button>
    </form>
  )
}