const express = require("express")
const AuthRouter = express.Router()
const User = require("../models/User")
const ObjectId = require("mongodb").ObjectId
const jwt = require("jsonwebtoken")

//signup
AuthRouter.route("/signup")
  .post((req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if(err){
        res.status(500)
        return next(err)
      }
      if(user){
        res.status(403)
        return next(new Error("That username is already taken!"))
      }
      const newUser = new User(req.body)
      newUser.save((err, savedUser) => {
        if(err){
          res.status(500)
          return next(err)
        }
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({token, user: savedUser.withoutPassword()})
      })
    })
  })
//login
AuthRouter.route("/login")
  .post((req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      if(!user) {
        res.status(403)
        return next(new Error("That Username doesn't exist!"))
      }
      // if(req.body.password !== user.password) {
      //   res.status(403)
      //   return next(new Error("Username and Password are incorrect!"))
      // }
      user.checkPassword(req.body.password, (err, isMatch) => {
        if(err){
          res.status(403)
          return next(new Error(`Username or Password are incorrect!`))
        }
        if(!isMatch){
          res.status(403)
          return next(new Error(`Username or Password are incorrect!`))
        }
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
        return res.status(200).send({ token, user: user.withoutPassword() })
      })
    })
  })

//   //get user by objectID
// AuthRouter.route("/:userId")
// .get((req, res, next) => {
//   console.log(req.params.userId)
//   User.find( { user: ObjectId(req.params.userId) }, (err, user) => {
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     return res.status(201).send(user.user)
//   } )
// })
module.exports = AuthRouter
