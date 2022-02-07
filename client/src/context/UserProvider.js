import React, { useState } from "react";
import axios from "axios"

//import IssueContext from "./IssueProvider";


export const UserContext = React.createContext()

const userAxios = axios.create()
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function UserProvider(props){
  const initState = {
    token: localStorage.getItem('token') || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    errMsg: "",
    issues: JSON.parse(localStorage.getItem("issues")) || [],
    allIssues: JSON.parse(localStorage.getItem("allissues")) || []
  }
  const [ userState, setUserState ] = useState(initState)
  
    //---LOGIN--//
  function logIn(credentials) {
    axios.post("/auth/login", credentials)
      .then(res => {
        const { token, user } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        getAllIssues()
        setUserState(prevUserState => ({...prevUserState, user, token}))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }
  //---SIGNUP--//
  function signUp(credentials) {
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({ ...prevUserState, user, token }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }
  //---LOGOUT--//
  function logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem("user")
    localStorage.removeItem("issues")
    localStorage.removeItem("allissues")
    setUserState({
      user: {},
      token: "",
      issues: [],
      allIssues: []
    })
  }
  //---HANDLE AUTH ERROR--//
  function handleAuthErr(errMsg){
    setUserState(prevState => ({...prevState, errMsg}))
  }
  //---RESET AUTH ERROR--//
  function resetAuthErr(){
    setUserState(prevState => ({...prevState, errMsg: ""}))
  }
  //---ISSUES--//

  //---ADD ISSUE---//
  function addIssue(issue){
    userAxios.post("/api/issue", issue)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
          allIssues: [...prevState.allIssues, res.data]
        }))
        const updateIssues = [
          ...JSON.parse(localStorage.getItem("issues")),
          { ...res.data}
        ]
        const updateAllIssues = [
          ...JSON.parse(localStorage.getItem("allissues")),
          { ...res.data}
        ]
        localStorage.setItem("allissues", JSON.stringify(updateAllIssues))
        localStorage.setItem("issues", JSON.stringify(updateIssues))
    })
      .catch(err => console.log(err))
  }
  //---GET USERS ISSUES--//
  function getUserIssues(){
    userAxios.get("/api/issue/user")
      .then(res => {
        localStorage.setItem("issues", JSON.stringify(res.data))
        setUserState(prevState => ({
          ...prevState,
          issues: res.data
          }))
      })
        .catch(err => console.log(err))
  }
  //---GET ALL ISSUES---// 
  function getAllIssues(){
    userAxios.get("/api/issue")
      .then(res => {
        localStorage.setItem("allissues", JSON.stringify(res.data))
        setUserState(prevState => ({
          ...prevState,
          allIssues: res.data
        }))
      })
      .catch(err => console.log(err))
  }
  //---DELETE ISSUE BY USER WHO CREATED IT---//
  function deleteIssue(DeletedId){
    console.log('DeletedId: ', DeletedId);
    userAxios.delete(`/api/issue/${DeletedId}`)
      .then(res => {console.log(res)
      setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.filter(issue => issue._id !== DeletedId),
        allIssues: prevState.allIssues.filter(issue => issue._id !== DeletedId)
        }))
      })
      .catch(err => console.log(err))
  }
  //---INCREMENT LIKE ON ISSUE---//
  function addLikeToIssue(id){
    console.log('from like : ', id);
    userAxios.put(`/api/issue/like/${id}`)
    .then(res => {
      console.log(res)
      setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.likes + 1,
        allIssues: prevState.allIssues,
      }))
    })
      .catch(err => console.log(err))
  }
  //---INCREMENT DISLIKE TO ISSUE---//
  function addDislikeToIssue(id){
    console.log('id: ', id);
    userAxios.put(`/api/issue/dislike/${id}`)
      .then(res => {
        console.log(res)
        setUserState(prevState => ({
          ...prevState,
          issues: prevState.issues,
          allIssues: prevState.allIssues,
        }))
      })
      .catch(err => console.log(err))
  }
  // //---POST COMMENT ON ISSUE---//
  // function postCommentOnIssue(issueId, comment){
  //   console.log('comment: ', comment);
  //   userAxios.post(`/api/issues/comments/${issueId}`, comment)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))

  // }
  return (
    <UserContext.Provider
    value={{
      ...userState,
      logIn,
      signUp,
      logOut,
      resetAuthErr,
      addIssue,
      addLikeToIssue,
      addDislikeToIssue,
      deleteIssue
    }}>
      { props.children }
    </UserContext.Provider>
  )
}