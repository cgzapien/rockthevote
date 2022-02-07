import React from "react";
import { Alert } from "@mui/material";



export default function ErrorPage(){
  const error = {
    margin: "150px"
  }
  return (
    <React.Fragment>
      <Alert variant="outlined" severity="error" style={error}>
        This page doesn't exist maybe you should go back to the Home page.
      </Alert>
    </React.Fragment>
  )
}