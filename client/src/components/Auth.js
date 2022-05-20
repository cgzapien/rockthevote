import React, {useState, useContext} from "react";
import { UserContext } from "../context/UserProvider"
import AuthForm from "./forms/AuthForm"
import "../css/landingPage.css"

export default function Auth(){
  const initInputs = {username: "", password: ""}
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signUp, logIn, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e) {
    const { name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs, [name]: value
    }))
  }
  function signup(e) {
    e.preventDefault()
    signUp(inputs)
  }
  function login(e){
    e.preventDefault()
    logIn(inputs)
  }
  function toggleForm(){
    setToggle(prevToggle => !prevToggle)
    resetAuthErr()
  }
  return (
    <div id="authform"  component="div">
      {!toggle ?
      <>
        <AuthForm
        formTitle="Sign In"
        formBtn="Sign In"
        toggleForm={toggleForm}
        handleChange={handleChange}
        handleSubmit={login}
        inputs={inputs}
        errMsg={errMsg}
        />
      </>
      :
      <>
      <AuthForm
        formTitle="Sign Up"
        formBtn="Sign Up"
        toggleForm={toggleForm}
        handleChange={handleChange}
        handleSubmit={signup}
        inputs={inputs} 
        errMsg={errMsg}
        />
      </>
      }
    </div>
  )
}