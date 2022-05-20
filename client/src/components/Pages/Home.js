import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { UserContext } from "../../context/UserProvider";

function Home(){
  const { user: {username}} = useContext(UserContext)
  const header = {margin: "80px 30%"}
  return (
    <div className="homepage">
      <Typography textAlign="center" variant="h3" style={header}>
        Welcome {username}!
      </Typography>
      <Typography textAlign="center">Rock the vote was created so you could engage with your community
      about issues that are impacting them. It is a forum where you can post issues in the community and other users can comment and like or dislike the issues. </Typography>
    </div>
  )
}
export default Home