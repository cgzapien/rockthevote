import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { UserContext } from "./context/UserProvider"

import ProtectedRoute from "./components/ProtectedRoute"
import Auth from "./components/Auth"
import NavBar from "./components/NavBar"
import Home from "./components/Pages/Home"
import ErrorPage from "./components/Pages/ErrorPage"
import IssuePage from "./components/Pages/IssuePage"
import PublicIssues from "./components/Pages/PublicIssues"
import IssueDetails from "./components/Pages/IssueDetails"

export default function App() {
  const { token, logOut, issues } = useContext(UserContext)
  return (
    <div className="app">
      {token && <NavBar logout={logOut}/>}
      <Switch>
         <Route
            exact path="/"
            render={()=> token ? <Redirect to="/home" /> : <Auth />}
         />
         <ProtectedRoute
            path="/home"
            component={Home}
            redirectTo="/"
            token={token}
          />
          <ProtectedRoute
            issues = {issues} 
            path="/issues"
            component={IssuePage}
            redirectTo="/"
            token={token}
          />
          <ProtectedRoute
            path="/publicissues"
            component={PublicIssues}
            redirectTo="/"
            token={token}
          />
          <ProtectedRoute
            path="/issuedetails/:issueId"
            component={IssueDetails}
            redirectTo="/"
            token={token}
          />
          <ProtectedRoute 
            path="*"
            component={ErrorPage}
            redirectTo="/"
            token={token}
          />

      </Switch>
    </div>
  )
}