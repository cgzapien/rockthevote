import React, { useState } from "react";
//import { UserContext } from "../../context/UserProvider"

import { Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function CommentsForm(props){
  const {id, postComment} = props
  const initInput = {
    comment: ""
  }
  const [input, setInput] = useState(initInput)
  // const { postCommentOnIssue } = useContext(UserContext)
  const { comment } = input

  function handleChange(e){
    const {name, value} = e.target
    setInput(prevState => ({...prevState, [name]: value})
    )

  }
  // function handleClick(e){
  //   e.preventDefault()
  //   postCommentOnIssue(id, input)
    
  // }
  return (
    <div className="commentsForm">
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
      <Button
        type="submit"
        variant="outlined"
        endIcon={<SendIcon/>}
        onClick={() => postComment(id, input)}
      >Submit Comment</Button>
    </div>
  )
}